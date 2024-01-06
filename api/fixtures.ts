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
        }, {
            title: "New Balance",
            price: 139,
            category: Category1._id,
            image: "fixtures/pic2.webp",
        }, {
            title: "Nike Air Force",
            price: 177,
            category: Category1._id,
            image: "fixtures/pic3.webp",
        }, {
            title: "Paul Smith",
            price: 470,
            category: Category1._id,
            image: "fixtures/pic4.webp",
        }, {
            title: "Nike Air Max 2090 ",
            price: 220,
            category: Category1._id,
            image: "fixtures/pic5.webp",
        }, {
            title: "Nike Air Max 1",
            price: 278,
            category: Category1._id,
            image: "fixtures/pic6.jpg",
        }, {
            title: "Dsquared2",
            price: 459,
            category: Category1._id,
            image: "fixtures/pic1.jpg",
        }, {
            title: "New Balance",
            price: 139,
            category: Category1._id,
            image: "fixtures/pic2.webp",
        }, {
            title: "Nike Air Force",
            price: 177,
            category: Category1._id,
            image: "fixtures/pic3.webp",
        }, {
            title: "Paul Smith",
            price: 470,
            category: Category1._id,
            image: "fixtures/pic4.webp",
        }, {
            title: "Nike Air Max 2090 ",
            price: 220,
            category: Category1._id,
            image: "fixtures/pic5.webp",
        }, {
            title: "Nike Air Max 1",
            price: 278,
            category: Category1._id,
            image: "fixtures/pic6.jpg",
        }, {
            title: "New Balance 9060",
            price: 219,
            category: Category2._id,
            image: "fixtures/pic7.webp",
        }, {
            title: "Y-3",
            price: 229,
            category: Category2._id,
            image: "fixtures/pic8.jpg",
        }, {
            title: "Air Force 1 Valentine's Day",
            price: 187,
            category: Category2._id,
            image: "fixtures/pic9.jpg",
        }, {
            title: "Balenciaga",
            price: 1145,
            category: Category2._id,
            image: "fixtures/pic10.jpg",
        }, {
            title: "Alexander McQueen",
            price: 615,
            category: Category2._id,
            image: "fixtures/pic11.jpg",
        }, {
            title: "Axel Arigato",
            price: 152,
            category: Category2._id,
            image: "fixtures/pic12.jpg",
        },
    );

    await User.create(
        {
            username: 'user',
            password: 'user',
            role: 'user',
            token: crypto.randomUUID(),
        },
        {
            username: 'admin',
            password: 'admin',
            role: 'admin',
            token: crypto.randomUUID(),
        },
    );

    await db.close();
};

run().catch(console.error);
