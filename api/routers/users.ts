import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import auth, { RequestWithUser } from '../middleware/auth';
import config from '../config';
import * as crypto from 'crypto';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    user.generateToken();

    await user.save();
    return res.send({
      message: "okay!",
      user,
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ error: "Wrong password or email!" });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: "Wrong password or email!" });
    }

    user.generateToken();
    await user.save();

    res.send({
      message: "email and password correct!",
      user,
    });
  } catch (e) {
    next(e);
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

export default usersRouter;
