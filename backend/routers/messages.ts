import { Router } from 'express';
import Message from '../models/Message';
import auth, { RequestWithUser } from '../middleware/auth';

const messagesRouter = Router()

messagesRouter.get('/', auth,async(req:RequestWithUser,res,next)=>{
  try {

    if(req.user){
      return res.send({error:'Something wrong with user data'})
    }
    const messages = await Message.find().populate('userId', 'displayName')
  }catch (e) {
    next(e)
  }
})


export default messagesRouter