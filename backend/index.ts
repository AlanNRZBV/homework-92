import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/users';
import messagesRouter from './routers/messages';
import expressWs from 'express-ws';
import { ActiveConnections } from './types';


const app = express();
expressWs(app)
const port = 8000;


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
