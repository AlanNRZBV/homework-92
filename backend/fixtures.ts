import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import crypto from "crypto";

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

  const collections = ['categories', 'products', 'users'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  await User.create([
    {
      email: 'user@spotify.com',
      password: '5str0ngPswrd',
      token: crypto.randomUUID(),
      role: 'client',
      displayName: 'us0r',
      avatar: 'fixtures/avatar_user.png',
    },
    {
      email: 'admin@spotify.com',
      password: '5str0ngPswrd',
      token: crypto.randomUUID(),
      role: 'admin',
      displayName: 'Mr.Anderson',
      avatar: 'fixtures/avatar_admin.png',
    },
  ]);

  await db.close();
};

void run();
