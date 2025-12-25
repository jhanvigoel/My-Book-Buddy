import prisma from "../Models/db.js";

export const createReview = async (req,res) => {

    try{

        const userId = req.user.id;

        const {googleVolumeId, text , rating, title, author, coverUrl, infoLink} = req.body;

        let book = await prisma.book.findUnique({

            where: {
                googleVolumeId : googleVolumeId
            },
            select: {
                id : true,

            }

        })

        if (!book){
            
            book = await prisma.book.create({

                data: {
                    googleVolumeId : googleVolumeId || null,
                    title : title,
                    coverUrl : coverUrl,
                    infoLink : infoLink || null ,
                    author: author
                }
            })
            
        }

        const newReview = await prisma.review.create({

            data: {
                userId : userId,
                bookId : book.id,
                content: text,
                rating: rating
            },
            select : {
                id : true,
                content: true,
                rating : true,
                user: {
                    select :{
                        id : true,
                        name : true,
                        photoUrl : true
                    }
                }
            }
        })

        return res.status(201).json(newReview);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error: error.message});
    }
}

export const getReview = async (req,res) => {

    try{

        const {bookId} = req.params;

        const book = await prisma.book.findUnique({

            where: {
                googleVolumeId : bookId,
            },
            select :{
                id : true,
            }
        })

        if (!book){
            return res.status(404).json({error : 'Book Not Found'});
        }

        const reviews = await prisma.review.findMany({

            where : {
                bookId : book.id
            },
            select : {
                content : true,
                rating : true,

                user: {
                    select : {
                        id : true,
                        name : true,
                        photoUrl : true
                    }
                }
            }
        })

        return res.status(200).json(reviews);

    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
}