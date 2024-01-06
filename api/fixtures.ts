import mongoose from 'mongoose';
import crypto from 'crypto';
import config from './config';
import Category from './models/Category';
import Product from './models/Product';
import User from './models/User';

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('products');
        await db.dropCollection('categories');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [Category1, Category2] = await Category.create(
        {
            title: "For him",
            description: "description",
        },
        {
            title: "For her",
            description: "description",
        }
    );

    await Product.create(
      {
        title: "Dsquared2",
        price: 459,
        category: Category1._id,
        image: "fixtures/pic1.jpg",
        description:
          "Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet",
      },
      {
        title: "New Balance",
        price: 139,
        category: Category1._id,
        image: "fixtures/pic2.webp",
        description:
          "Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet",
      },
      {
        title: "Nike Air Force",
        price: 177,
        category: Category1._id,
        image: "fixtures/pic3.webp",
        description:
          "Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet",
      },
      {
        title: "Paul Smith",
        price: 470,
        category: Category1._id,
        image: "fixtures/pic4.webp",
        description:
          "Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet",
      },
      {
        title: "Nike Air Max 2090 ",
        price: 220,
        category: Category1._id,
        image: "fixtures/pic5.webp",
        description:
          "Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet",
      },
      {
        title: "Nike Air Max 1",
        price: 278,
        category: Category1._id,
        image: "fixtures/pic6.jpg",
        description:
          "Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet",
      },
      {
        title: "New Balance 9060",
        price: 219,
        category: Category2._id,
        image: "fixtures/pic7.webp",
        description:
          "Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet",
      },
      {
        title: "Y-3",
        price: 229,
        category: Category2._id,
        image: "fixtures/pic8.webp",
        description:
          "Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet",
      },
      {
        title: "Air Force 1 Valentine's Day",
        price: 187,
        category: Category2._id,
        image: "fixtures/pic9.jpg",
        description:
          "Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet",
      },
      {
        title: "Balenciaga",
        price: 1145,
        category: Category2._id,
        image: "fixtures/pic10.jpg",
        description:
          "Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet",
      },
      {
        title: "Alexander McQueen",
        price: 615,
        category: Category2._id,
        image: "fixtures/pic11.webp",
        description:
          "Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet",
      },
      {
        title: "Axel Arigato",
        price: 152,
        category: Category2._id,
        image: "fixtures/pic12.webp",
        description:
          "Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet",
      }
    );

    await User.create(
      {
        email: "user@gmail.com",
        password: "user",
        role: "user",
        displayName: "user",
        token: crypto.randomUUID(),
      },
      {
        email: "admin@gmail.com",
        password: "admin",
        role: "admin",
        displayName: "admin",
        token: crypto.randomUUID(),
      }
    );

    await db.close();
};

run().catch(console.error);
