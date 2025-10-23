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
                phone: true
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