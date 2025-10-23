import prisma from "../Models/db.js";

export const getReadingHistory = async (req,res) => {

    try {

        const userId = req.user.id;

        const wantToReadHistory = await prisma.readingHistory.findMany({
            where : { userId : parseInt(userId), status : 'WANT_TO_READ' },

            select: {
                id: true,
                startedAt: true,
                finishedAt: true,
                book: {
                    select: {
                        id: true,
                        title: true,
                        author: true,
                        coverUrl: true
                    }
                }
            }
        );

        const ReadingHistory = await prisma.readingHistory.findMany({
            where : { userId : parseInt(userId), status : 'READING' },

            select: {
                id: true,
                startedAt: true,
                finishedAt: true,
                book: {
                    select: {
                        id: true,
                        title: true,
                        author: true,
                        coverUrl: true
                    }
                }
            }
        });

        const CompletedHistory = await prisma.readingHistory.findMany({
            where : { userId : parseInt(userId), status : 'COMPLETED' },

            select: {
                id: true,
                startedAt: true,
                finishedAt: true,
                book: {
                    select: {
                        id: true,
                        title: true,
                        author: true,
                        coverUrl: true
                    }
                }
            }
        });

        const history = {
            WANT_TO_READ: wantToReadHistory,
            READING: ReadingHistory,  
            COMPLETED: CompletedHistory
        }

        return res.status(200).json({ history });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}