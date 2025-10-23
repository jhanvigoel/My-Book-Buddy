import prisma from "../Models/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const RegisterController = async(req,res) => {

    try{

        const {name,email,phone,password} = req.body;

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { phone: phone }
                ]
            }
        })

        if (user){
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await prisma.user.create({
            data:{
                name : name,
                email : email,
                phone : phone,
                password : hashedPassword
            }
        })

        const { password: _password, ...safeUser } = newUser;
        return res.status(201).json(safeUser);
    }
    catch(err){

        console.log(err);

        return res.status(500).json({error: err.message});

    }
}

export const LoginController = async(req,res) => {

    try{

        const {email,password} = req.body;

        const user = await prisma.user.findFirst({
            where : {
                email : email,
            }
        })

        if (!user){

            return res.json({error:"user does not exist"}).status(400);

        }

        const currPassword = await bcrypt.compare(password,user.password);

        if (!currPassword){

            return res.json({error:"Invalid credentials"}).status(400);

        }

        const payload = {
            id : user.id,
            email : user.email,
            name : user.name,
            phone : user.phone
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.status(200).json({ message : "Login successful", token });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}