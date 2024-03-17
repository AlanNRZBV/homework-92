import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import crypto from "crypto";
import Message from './models/Message';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['messages', 'users'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  await User.create([
    {
      email: 'user@test.com',
      password: '5str0ngPswrd',
      token: crypto.randomUUID(),
      role: 'client',
      displayName: 'us0r',
    },
    {
      email: 'admin@test.com',
      password: '5str0ngPswrd',
      token: crypto.randomUUID(),
      role: 'admin',
      displayName: 'Mr.Anderson',
    },
    {
      email: 'user1@test.com',
      password: '5str0ngPswrd',
      token: crypto.randomUUID(),
      role: 'client',
      displayName: 'John Doe',
    },
    {
      email: 'user2@test.com',
      password: '5str0ngPswrd',
      token: crypto.randomUUID(),
      role: 'client',
      displayName: 'Jane Doe',
    },
  ]);

  const defaultUser = await User.findOne({email:'user@test.com'})
  const johnDoe = await User.findOne({email:'user1@test.com'})
  const janeDoe = await User.findOne({email:'user2@test.com'})
  const admin = await User.findOne({email:'admin@test.com'})

  await Message.create([
    {
      content:'Default message',
      userId: defaultUser?._id
    },
    {
      content:'Another default message',
      userId: defaultUser?._id
    },
    {
      content:'Admin message',
      userId: admin?._id
    },
    {
      content:'Another admin message',
      userId: admin?._id
    },
    {
      content:'John Doe was here',
      userId: johnDoe?._id
    },
    {
      content:'Jane Doe was here',
      userId: janeDoe?._id
    },
    {
      content:'qwerty qwerty',
      userId: johnDoe?._id
    },
    {
      content:'asdfgh asdfgh',
      userId: janeDoe?._id
    },
  ])

  await db.close();
};

void run();
