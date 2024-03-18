import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/users';
import messagesRouter from './routers/messages';
import expressWs from 'express-ws';
import { ActiveConnections, IncomingLoginMessage, UserOnline } from './types';
import User from './models/User';


const app = express();
expressWs(app)
const port = 8000;


const router = express.Router();

const activeConnections: ActiveConnections = {};

router.ws('/chat',(ws, _req, _next) => {
  const id = crypto.randomUUID();
  console.log('Client connected');
  activeConnections[id] = ws;

  ws.on('message', async (message) => {
    const parsedMessage = JSON.parse(message.toString()) as IncomingLoginMessage;
    if (parsedMessage.type === 'LOGIN') {
      const user = await User.findOne({token:parsedMessage.payload})
      const usersOnline = await User.find().select('-_id -password -token -email -role')
      Object.values(activeConnections).forEach((connection) => {
        const outgoingMsg = {
          type: 'USERS_TOTAL',
          payload: usersOnline,
        };
        connection.send(JSON.stringify(outgoingMsg));
      });
    }

    if(parsedMessage.type === 'LOGOUT')
    {
      const user = await User.findOne({token:parsedMessage.payload})
      user?.setOffline()
      await user?.save()

      const usersOnline = await User.find().select('-_id -password -token -email -role')

      Object.values(activeConnections).forEach((connection) => {
        const outgoingMsg = {
          type: 'USERS_TOTAL',
          payload: usersOnline,
        };
        connection.send(JSON.stringify(outgoingMsg));
      });


    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    delete activeConnections[id];
  });
});

app.use(router);


app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/messages', messagesRouter);
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
