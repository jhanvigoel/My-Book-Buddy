import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import nonUserRouter from './routes/NonUserRoutes.js';
import router from './routes/AuthRoutes.js';
import Userrouter from './routes/UserRoutes.js';
import cookieParser from 'cookie-parser';

import './Models/db.js';

const app = express();

const effectiveOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: effectiveOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', nonUserRouter);
app.use('/', router);
app.use('/', Userrouter);

const PORT = process.env.PORT || 5000;

function logStartup() {
    const requiredSecrets = ['ACCESS_SECRET', 'REFRESH_SECRET', 'JWT_SECRET'];
    const missing = requiredSecrets.filter(k => !process.env[k]);
    console.log('[Startup] CORS origin:', effectiveOrigin);
    if (missing.length) {
        console.warn('[Startup] Missing auth secrets:', missing.join(', '));
    } else {
        console.log('[Startup] All auth secrets present');
    }
}

app.listen(PORT, () => {
    console.log('server is running on port', PORT);
    logStartup();
});
