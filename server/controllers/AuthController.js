import prisma from "../Models/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from "crypto";

function createAccessToken(id) {
    return jwt.sign(id, process.env.ACCESS_SECRET, { expiresIn: '15m' });
}

function createRefreshToken(id) {
    return jwt.sign(id, process.env.REFRESH_SECRET, { expiresIn: '7d' });
}

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

        const accessToken = createAccessToken({id: user.id});
        const refreshToken = createRefreshToken({id: user.id});

        const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
        const refreshExpiryMs = 7 * 24 * 60 * 60 * 1000;

        await prisma.refreshToken.create({

            data:{
                userId: user.id,
                tokenHash: tokenHash,
                expiresAt: new Date(Date.now() + refreshExpiryMs),
            }
        });

        const payload = {
            id : user.id,
            email : user.email,
            name : user.name,
            phone : user.phone
        }

        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure: true,
            sameSite: 'Strict',
            path: '/refresh-token'
        });

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.status(200).json({ message : "Login successful", accessToken, token });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

export const LogoutController = async (req,res) => {

    try{

        const {refreshToken} = req.cookies || {};

        if (!refreshToken){
            return res.status(400).json({ error: "Refresh token not found" });
        }

        const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

        const existing = await prisma.refreshToken.findUnique({
            where: {
                tokenHash: tokenHash
            }
        });

        if (existing){

            await prisma.refreshToken.update({
                where: {
                    tokenHash: tokenHash
                },
                data : {
                    revokedAt : new Date()
                }
            })
        }

        res.clearCookie('refreshToken',{path: "/refresh-token"})

        return res.status(200).json({ message: "Logout successful" });

    }
    catch(err){

        return res.status(500).json({"error in logout": err.message});
        
    }
}