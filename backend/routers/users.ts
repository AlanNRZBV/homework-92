import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import { UserData } from '../types';

const usersRouter = Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const userData: UserData = {
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
    };

    const user = new User(userData);

    user.generateToken();
    await user.save();

    res.send(user);
  } catch (e) {
    next(e);
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(422).send({ error: 'Email not found!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'Password is wrong' });
    }

    user.generateToken();
  user.setOnline()
    await user.save();

    return res.send({ message: 'Email and password is correct!', user });
  } catch (e) {
    next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    const successMessage = { message: 'Success!' };

    if (!headerValue) {
      return res.send(successMessage);
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.send(successMessage);
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.send(successMessage);
    }

    user.generateToken();
    await user.save();
    return res.send(successMessage);
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
