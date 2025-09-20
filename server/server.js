import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import nonUserRouter from './routes/NonUserRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/',nonUserRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log('server is running on port',PORT);
})
