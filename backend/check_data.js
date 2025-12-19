
import mongoose from 'mongoose';
import { Product } from './models/productModel.js';
import 'dotenv/config';

const connectDB = async () => {
    const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/rushbasket';
    try {
        await mongoose.connect(dbUrl);
        console.log("DB CONNECTED");
    } catch (err) {
        console.error("DB CONNECTION ERROR:", err);
        process.exit(1);
    }
}

const checkData = async () => {
    await connectDB();
    const products = await Product.find({});
    console.log("Total products:", products.length);
    if (products.length > 0) {
        console.log("Sample product:", JSON.stringify(products[0], null, 2));
        console.log("First 5 product names and images:");
        products.slice(0, 5).forEach(p => console.log(`${p.name}: ${p.imageUrl}`));
    }
    process.exit();
};

checkData();
