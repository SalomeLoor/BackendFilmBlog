import express from 'express';
import { getComments, setComment } from '../controller/CommentController.js';
import  {verifyToken}  from '../middleware/auth.js';


const rotuer = express.Router();

rotuer.post('/comments',verifyToken,setComment);
rotuer.get('/obtener/:id',verifyToken,getComments);

export const commentRoutes = rotuer;