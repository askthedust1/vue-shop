import express from 'express';
import { IProduct } from '../type';
import { imagesUpload } from '../multer';
import Product from '../models/Product';
const productsRouter = express.Router();
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

productsRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'title');

    return res.send(products);
  } catch {
    return res.sendStatus(500);
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "title"
    );

    if (!product) {
      return res.sendStatus(404);
    }

    return res.send(product);
  } catch {
    return res.sendStatus(500);
  }
});

productsRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const productData: IProduct = {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        price: parseFloat(req.body.price),
        image: req.file ? req.file.filename : null,
      };

      const product = new Product(productData);
      await product.save();

      return res.send(product);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(error);
      }

      next(error);
    }
  },
);

export default productsRouter;
