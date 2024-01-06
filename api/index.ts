import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import config from './config';
import categoriesRouter from "./routers/categories";
import usersRouter from "./routers/users";
import productsRouter from "./routers/products";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch((e) => console.error(e));
