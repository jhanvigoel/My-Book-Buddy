import express from 'express'
import { fetchbooks , popularBooks} from '../controllers/books.js';

const nonUserRouter = express.Router();

nonUserRouter.get('/books',async (req,res) =>{

    if (req.query.q){
        return fetchbooks(req,res);
    }
    else{
        return popularBooks(req,res);
    }
})

export default nonUserRouter;