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
                        coverUrl: true,
                        googleVolumeId: true,
                        infoLink: true
                    }
                }
            }
        });

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
                        coverUrl: true,
                        googleVolumeId: true,
                        infoLink: true
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
                        coverUrl: true,
                        googleVolumeId: true,
                        infoLink: true
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

export const createReadingHistory = async (req,res) => {

    try{

        const userId = req.user.id; 
        const { title, author, coverUrl, status, googleVolumeId, infoLink } = req.body;

        if (!status){
            return res.status(400).json({ error: "Status is required" });
        }

        if (!title || !author) {
            return res.status(400).json({ error: "Title and Author are required" });
        }

        let book = null;

        if (googleVolumeId) {
            book = await prisma.book.findUnique({
                where: { googleVolumeId }
            });
        }

        if (!book) {
            book = await prisma.book.findFirst({
                where: {
                    title: title,
                    author: author
                }
            });
        }

        if (!book){

            book = await prisma.book.create({
                data: {
                    title: title,
                    author: author,
                    coverUrl: coverUrl,
                    googleVolumeId: googleVolumeId || null,
                    infoLink: infoLink || null,
                }
            })
        }

        const existingHistory = await prisma.readingHistory.findFirst({
            where: {
                userId: userId,
                bookId: book.id
            }
        });

        if (existingHistory) {
            return res.status(400).json({ error: "Reading history already exists for this book" });
        }

        const newReadingHistory = await prisma.readingHistory.create({
            data: {
                userId: userId,
                bookId: book.id,
                status: status,
                startedAt: status === 'READING' ? new Date() : null,
                finishedAt: status === 'COMPLETED' ? new Date() : null
            }
        });

        return res.status(201).json({ message: "Book added successfully", readingHistory: newReadingHistory });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}