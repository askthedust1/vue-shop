import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import auth, { RequestWithUser } from '../middleware/auth';
import { OAuth2Client } from 'google-auth-library';
import config from '../config';
import * as crypto from 'crypto';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();

    await user.save();
    return res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send({ error: 'Wrong password or username!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Wrong password or username!' });
    }

    user.generateToken();
    await user.save();

    res.send({
      message: 'Username and password correct!',
      user,
    });
  } catch (e) {
    next(e);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Google Login Error!' });
    }

    const email = payload['email'];
    const googleId = payload['sub'];
    const displayName = payload['name'];

    if (!email) {
      return res.status(400).send({ error: 'Not enough user data to continue' });
    }

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({
        username: email,
        password: crypto.randomUUID(),
        googleId,
        displayName,
      });
    }

    user.generateToken();
    await user.save();

    res.send({
      message: 'Login with Google successful!',
      user,
    });
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');

    if (!token) {
      return res.send({ message: 'Success' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send({ message: 'Success' });
    }

    await user.generateToken();
    user.save();

    return res.send({ message: 'Success' });
  } catch (e) {
    next(e);
  }
});

usersRouter.get('/secret', auth, async (req, res) => {
  const user = (req as RequestWithUser).user;

  res.send({
    message: 'Secret message!',
    username: user.username,
  });
});

export default usersRouter;
