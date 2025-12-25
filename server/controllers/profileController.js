import prisma from '../Models/db.js';

export const getUserProfile = async(req,res) => {

    try{

        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where : {id : parseInt(userId)},
            select : {
                id: true,
                name: true,
                email: true,
                phone: true,
                photoUrl: true
            }
        })

        if (!user){
            return res.status(404).json({error: "User not found"});
        }

        return res.status(200).json({user});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({error: error.message});
    }
}

export const getProfilePhoto = async(req,res) => {

    try{

        const userId = req.user.id;

        const data = await prisma.user.findUnique({

            where: {
                id : userId
            },
            select : {
                photoUrl : true
            }
        })

        if (!data){
            return res.status(404).json({error: "User Not Found"});
        }

        return res.status(200).json({photoUrl : data.photoUrl});

    }
    catch(err){

        return res.status(500).json({error: err.message});

    }

}

export const uploadProfilePhoto = async(req,res) => {

    try{

        const userId = req.user.id;

        const {photoUrl} = req.body;

        const data = await prisma.user.update({
            where:{
                id: userId
            },
            data : {
                photoUrl : photoUrl
            }
        });

        return res.status(200).json({message: 'Photo Upload Successful'});

    }
    catch(err){
        return res.status(500).json({error : err.message});
    }

}