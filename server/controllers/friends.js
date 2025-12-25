import prisma from '../Models/db.js';


export async function searchPeople(req, res) {

  try {
    const me = Number(req.user.id);
    const q = (req.query.query || '').trim();
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const pageSize = Math.min(Math.max(parseInt(req.query.pageSize || '20', 10), 1), 100);

    if (!q) return res.json({ items: [], page, pageSize, total: 0 });

    const where = {
      id: { not: me },
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { phone: { contains: q, mode: 'insensitive' } },
      ],
    };

    const [rows, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          photoUrl: true,
          friendshipsInitiated: { //second people have initiated friendship with us
            where: { friend2Id: me },
            select: { id: true, status: true, friend1Id: true, friend2Id: true },
            take: 1,
          },
          friendshipsReceived: { //people whom we have initiated friendship with
            where: { friend1Id: me },
            select: { id: true, status: true, friend1Id: true, friend2Id: true },
            take: 1,
          },
        },
        orderBy: { name: 'asc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.user.count({ where }),
    ]);

    const items = rows.map((u) => {
      const rel = u.friendshipsInitiated[0] || u.friendshipsReceived[0] || null;
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        photoUrl: u.photoUrl,
        relation: rel
          ? {
              friendshipId: rel.id,
              status: rel.status,
              initiatorId: rel.friend1Id,
              receiverId: rel.friend2Id,
              iAmInitiator: rel.friend1Id === me,
            }
          : null,
      };
    });

    return res.json({ items, page, pageSize, total });
  } catch (err) {
    console.error('searchPeople error:', err);
    return res.status(500).json({ error: err.message });
  }
}

// POST /friends/request { toUserId }
export async function sendFriendRequest(req, res) {
  try {
    const me = Number(req.user.id);
    const to = Number(req.body.toUserId);
    if (!to) return res.status(400).json({ error: 'toUserId required' });
    if (me === to) return res.status(400).json({ error: 'Cannot friend yourself' });

    const existing = await prisma.friends.findFirst({
      where: {
        OR: [
          { friend1Id: me, friend2Id: to },
          { friend1Id: to, friend2Id: me },
        ],
      },
    });
    if (existing) return res.status(409).json({ error: 'Relation already exists', relation: existing });

    const created = await prisma.friends.create({
      data: { friend1Id: me, friend2Id: to, status: 'PENDING' },
    });
    return res.json({ ok: true, relation: created });
  } catch (err) {
    console.error('sendFriendRequest error:', err);
    return res.status(500).json({ error: err.message });
  }
}

// POST /friends/respond { friendshipId, action: 'ACCEPT'|'DENY' }
export async function respondToRequest(req, res) {
  try {
    const me = Number(req.user.id);
    const { friendshipId, action } = req.body;
    const rel = await prisma.friends.findUnique({ where: { id: Number(friendshipId) } });
    if (!rel) return res.status(404).json({ error: 'Not found' });
    if (rel.friend2Id !== me) return res.status(403).json({ error: 'Only receiver can respond' });
    if (rel.status !== 'PENDING') return res.status(400).json({ error: 'Not pending' });
    const status = action === 'ACCEPT' ? 'ACCEPTED' : 'DENIED';
    const updated = await prisma.friends.update({ where: { id: rel.id }, data: { status } });
    return res.json({ ok: true, relation: updated });
  } catch (err) {
    console.error('respondToRequest error:', err);
    return res.status(500).json({ error: err.message });
  }
}

export async function cancelPending(req, res) {
  try {
    const me = Number(req.user.id);
    const { friendshipId } = req.body;
    const rel = await prisma.friends.findUnique({ where: { id: Number(friendshipId) } });
    if (!rel) return res.status(404).json({ error: 'Not found' });
    if (rel.status !== 'PENDING' || rel.friend1Id !== me) return res.status(403).json({ error: 'Only initiator can cancel pending' });
    await prisma.friends.delete({ where: { id: rel.id } });
    return res.json({ ok: true });
  } catch (err) {
    console.error('cancelPending error:', err);
    return res.status(500).json({ error: err.message });
  }
}

export async function unfriend(req, res) {
  try {
    const me = Number(req.user.id);
    const id = Number(req.params.id);
    const rel = await prisma.friends.findUnique({ where: { id } });
    if (!rel) return res.status(404).json({ error: 'Not found' });
    if (rel.status !== 'ACCEPTED') return res.status(400).json({ error: 'Not friends' });
    if (rel.friend1Id !== me && rel.friend2Id !== me) return res.status(403).json({ error: 'Not your friendship' });
    await prisma.friends.delete({ where: { id } });
    return res.json({ ok: true });
  } catch (err) {
    console.error('unfriend error:', err);
    return res.status(500).json({ error: err.message });
  }
}

export const FriendRequests = async (req,res) => {

  try{

      const me = Number(req.user.id);

      const recieved = await prisma.friends.findMany({
         where : {
             friend2Id : me,
             status : 'PENDING'
         },
         select : {
             status : true,
             id : true,
             friend1: {
                 select : {
                      id : true,
                      name : true,
                      email : true,
                      phone : true,
                      photoUrl : true,
                 }
             }
         },
         orderBy: {
          id : 'desc'
         },
      })

      const initiated = await prisma.friends.findMany({

        where : {
           friend1Id : me,
           status : 'PENDING',
        },
        select : {
          status : true,
          id : true,
          friend2 : {
            select : {
              id : true,
              name : true,
              email : true,
              phone : true,
              photoUrl : true,
            }
          }
        },
        orderBy : {
          id : 'desc',
        }
      })

      const friends = await prisma.friends.findMany({
        where : {
          OR: [
            { friend2Id : me },
            { friend1Id : me }
          ],
          status : 'ACCEPTED'
        },
        select : {
           id : true,
           friend1 : {
              select : {
                id : true,
                name : true,
                email : true,
                phone : true,
                photoUrl : true,
              }
           },
           friend2 : {
              select : {
                id : true,
                name : true,
                email : true,
                phone : true,
                photoUrl : true,
              }
           }
        }
      })

      const payload = {

        friendshipRecieved : recieved,
        friendshipInitiated : initiated,
        friendsList : friends,
        myId : me,
      }

      return res.json(payload);

    }
    catch(err){
      res.json({error: err.message});
    }
}


export async function friendsActivity(req, res) {
  try {
    const me = Number(req.user.id);
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const pageSize = Math.min(Math.max(parseInt(req.query.pageSize || '20', 10), 1), 100);
   
    const statuses = String(req.query.status || 'READING,COMPLETED')
      .split(',')
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean);


    const rels = await prisma.friends.findMany({
      where: {
        status: 'ACCEPTED',
        OR: [{ friend1Id: me }, { friend2Id: me }],
      },
      select: { friend1Id: true, friend2Id: true },
    });

    if (rels.length === 0) {
      return res.json({ items: [], page, pageSize, total: 0 });
    }

    const friendIds = rels.map((r) => (r.friend1Id === me ? r.friend2Id : r.friend1Id));

    const where = {
      userId: { in: friendIds },
      status: { in: statuses },
    };

    const [items, total] = await Promise.all([
      prisma.readingHistory.findMany({
        where,
        include: {
          user: { select: { id: true, name: true } },
          book: { select: { id: true, title: true, author: true, coverUrl: true , googleVolumeId: true, infoLink: true} },
        },
        orderBy: [
          { finishedAt: 'desc' },
          { startedAt: 'desc' },
          { id: 'desc' },
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.readingHistory.count({ where }),
    ]);

    return res.json({ items, page, pageSize, total });
  } catch (err) {
    console.error('friendsActivity error:', err);
    return res.status(500).json({ error: err.message });
  }
}
