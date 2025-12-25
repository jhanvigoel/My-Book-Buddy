import prisma from "../Models/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from "crypto";

function ensureSecrets() {

    const required = ['ACCESS_SECRET', 'REFRESH_SECRET', 'JWT_SECRET'];
    const missing = required.filter(k => !process.env[k]);
    if (missing.length) {
        console.error('[Auth] Missing required env secrets:', missing.join(', '));
        return { ok: false, missing };
    }
    return { ok: true };
    
}

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

export const LoginController = async (req, res) => {
    const secretsOk = ensureSecrets();
    if (!secretsOk.ok) {
        return res.status(500).json({ error: 'Server configuration error: missing secrets' });
    }
    try {
        const { email, password } = req.body || {};
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        let accessToken, refreshToken;
        try {
            accessToken = createAccessToken({ id: user.id });
            refreshToken = createRefreshToken({ id: user.id });
        } catch (tokenErr) {
            console.error('[Auth] JWT signing error:', tokenErr);
            return res.status(500).json({ error: 'Token generation failed' });
        }

        const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
        const refreshExpiryMs = 7 * 24 * 60 * 60 * 1000;

        try {
            await prisma.refreshToken.create({
                data: {
                    userId: user.id,
                    tokenHash,
                    expiresAt: new Date(Date.now() + refreshExpiryMs)
                }
            });
        } catch (dbErr) {
            console.error('[Auth] Failed to persist refresh token:', dbErr);
            return res.status(500).json({ error: 'Failed to persist session token' });
        }

        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone
        };

        const isProd = process.env.NODE_ENV === 'production';
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProd ? true : false,
            sameSite: isProd ? 'None' : 'Lax',
            path: '/'
        });

        let token;
        try {
            token = jwt.sign(payload, process.env.JWT_SECRET);
        } catch (payloadErr) {
            console.error('[Auth] JWT payload sign error:', payloadErr);
            return res.status(500).json({ error: 'Payload signing failed' });
        }
        return res.status(200).json({ message: 'Login successful', accessToken, token });
    } catch (err) {
        console.error('[Auth] Unhandled login error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const LogoutController = async (req, res) => {
    try {
        const { refreshToken } = req.cookies || {};
        if (!refreshToken) {
            return res.status(400).json({ error: 'Refresh token not found' });
        }

        const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
        const existing = await prisma.refreshToken.findUnique({ where: { tokenHash } });
        if (existing) {
            await prisma.refreshToken.update({
                where: { tokenHash },
                data: { revokedAt: new Date() }
            });
        }

        res.clearCookie('refreshToken', { path: '/' });
        return res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const RefreshTokenController = async (req, res) => {

    const secretsOk = ensureSecrets();
    if (!secretsOk.ok) {
        return res.status(500).json({ error: 'Server configuration error: missing secrets' });
    }
    try {
        const { refreshToken } = req.cookies || {};
        if (!refreshToken) {
            return res.status(400).json({ error: 'Refresh token not found' });
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        } catch (e) {
            console.warn('[Auth] Provided refresh token failed verification:', e.message);
            return res.status(401).json({ error: 'Invalid refresh token' });
        }

        const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
        const existing = await prisma.refreshToken.findUnique({ where: { tokenHash } });

        if (!existing) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }
        if (existing.revokedAt) {
            return res.status(401).json({ error: 'Token revoked' });
        }
        if (existing.expiresAt < new Date()) {
            return res.status(401).json({ error: 'Token expired' });
        }
        let accessToken;
        try {
            accessToken = createAccessToken({ id: existing.userId });
        } catch (tokenErr) {
            console.error('[Auth] Access token refresh sign error:', tokenErr);
            return res.status(500).json({ error: 'Could not create access token' });
        }
        return res.status(200).json({ accessToken });
    } catch (err) {
        console.error('[Auth] Unhandled refresh error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};