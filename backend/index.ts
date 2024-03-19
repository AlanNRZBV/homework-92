import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/users';
import expressWs from 'express-ws';
import { ActiveConnections, IncomingLoginMessage, IncomingMessageDataMessage, UserOnline } from './types';
import User from './models/User';
import Message from './models/Message';
import users from './routers/users';


const app = express();
expressWs(app)
const port = 8000;


const router = express.Router();

const activeConnections: ActiveConnections = {};


router.ws('/chat', (ws, _req, _next) => {

  let id: string

  ws.on('message', async (message) => {

    const parsedLoginMessage = JSON.parse(message.toString()) as IncomingLoginMessage;
    const parsedMessageDataMessage = JSON.parse(message.toString()) as IncomingMessageDataMessage;

    if (parsedLoginMessage.type === 'LOGIN') {
      const user = await User.findOne({ token: parsedLoginMessage.payload });

      if(!user?.isOnline){
        user?.setOnline()
        user?.save()
      }

      if (user) {
        console.log(`Client ${user.displayName} connected`);
        id = parsedLoginMessage.payload
        activeConnections[id] = ws;
      }
    }

    if (parsedLoginMessage.type === 'LOGOUT') {
      const user = await User.findOne({ token: parsedLoginMessage.payload });
      if (user) {
        user.setOffline();
        await user.save();
        delete activeConnections[id];
      }
    }

    if(parsedMessageDataMessage.type === 'NEW_MESSAGE'){

      console.log('check ', parsedMessageDataMessage.payload)

      const {content, recipient, userId} = parsedMessageDataMessage.payload

      const recipientValue = await User.findById(recipient)

      const messageData = {
        content: content,
        recipient: recipientValue?._id,
        userId: userId
      }

      const message = new Message(messageData)
      await message.save()
    }

    const usersTotal = await User.find().select('-_id -password -token -email -role');
    const lastMessages = await Message.find().sort({datetime: -1}).limit(30)

    Object.values(activeConnections).forEach((connection) => {
      const outgoingMsgWithUsers = {
        type: 'USERS_TOTAL',
        payload: usersTotal,
      };
      const outgoingMsgWithMessages = {
        type:'LAST_MESSAGES',
        payload: lastMessages
      }
      connection.send(JSON.stringify(outgoingMsgWithUsers));
      connection.send(JSON.stringify(outgoingMsgWithMessages));
    });
  });

  ws.on('close', async () => {

    const user = await User.findOne({token:id})

    console.log(user ? `Client ${user.displayName} disconnected`:'Something went wrong');

      if (user) {
        user.setOffline();
        await user.save();
        delete activeConnections[id];
      }

  });
});

app.use(router);


app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
