import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { Product } from './models/productModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');

const getCategory = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('apple') || lowerName.includes('banana') || lowerName.includes('orange') || lowerName.includes('grape') || lowerName.includes('fruit') || lowerName.includes('mango') || lowerName.includes('papaya') || lowerName.includes('kiwi') || lowerName.includes('pomelo') || lowerName.includes('persimmon') || lowerName.includes('rambutan') || lowerName.includes('star fruit') || lowerName.includes('strawberry') || lowerName.includes('mangosteen') || lowerName.includes('melon')) return 'Fruits';
    if (lowerName.includes('carrot') || lowerName.includes('potato') || lowerName.includes('onion') || lowerName.includes('broccoli') || lowerName.includes('pepper') || lowerName.includes('spinach') || lowerName.includes('tomato') || lowerName.includes('cucumber') || lowerName.includes('garlic')) return 'Vegetables';
    if (lowerName.includes('milk') || lowerName.includes('cheese') || lowerName.includes('butter') || lowerName.includes('yogurt') || lowerName.includes('cream') || lowerName.includes('paneer') || lowerName.includes('ghee') || lowerName.includes('lassi')) return 'Dairy';
    if (lowerName.includes('bread') || lowerName.includes('baguette') || lowerName.includes('bun') || lowerName.includes('cake') || lowerName.includes('donut') || lowerName.includes('croissant') || lowerName.includes('eclair') || lowerName.includes('focaccia') || lowerName.includes('naan') || lowerName.includes('khobz') || lowerName.includes('limpa') || lowerName.includes('simit') || lowerName.includes('loaf')) return 'Bakery';
    if (lowerName.includes('beef') || lowerName.includes('pork') || lowerName.includes('chicken') || lowerName.includes('lamb') || lowerName.includes('steak') || lowerName.includes('meat') || lowerName.includes('ham') || lowerName.includes('turkey') || lowerName.includes('veal') || lowerName.includes('yak')) return 'Meat';
    if (lowerName.includes('fish') || lowerName.includes('crab') || lowerName.includes('lobster') || lowerName.includes('oyster') || lowerName.includes('scallop') || lowerName.includes('mussel') || lowerName.includes('mackerel') || lowerName.includes('anchovies')) return 'Seafood';
    if (lowerName.includes('juice') || lowerName.includes('coffee') || lowerName.includes('tea') || lowerName.includes('water') || lowerName.includes('cola') || lowerName.includes('drink') || lowerName.includes('soda')) return 'Beverages';
    if (lowerName.includes('chip') || lowerName.includes('popcorn') || lowerName.includes('cookie') || lowerName.includes('chocolate') || lowerName.includes('candy') || lowerName.includes('snack') || lowerName.includes('bar') || lowerName.includes('pretzel') || lowerName.includes('truffle') || lowerName.includes('halva') || lowerName.includes('bonbon') || lowerName.includes('trail mix') || lowerName.includes('honeycomb')) return 'Snacks';
    return 'Groceries';
};

const getRandomPrice = () => {
    const min = 1;
    const max = 50;
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

const seedProducts = async () => {
    try {
        await connectDB();
        
        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products.');

        const files = fs.readdirSync(uploadsDir);
        const products = [];

        for (const file of files) {
            // Check if file is an image
            if (!file.match(/\.(png|jpg|jpeg|gif)$/)) continue;

            // Filename format: timestamp-ProductName.ext
            // Example: 1715408544927-Fresh Apples.png
            const parts = file.split('-');
            if (parts.length < 2) continue; // Skip files that don't match format

            // Join the parts after the first hyphen to handle product names with hyphens
            const nameWithExt = parts.slice(1).join('-');
            const name = path.parse(nameWithExt).name; // Remove extension

            const category = getCategory(name);
            const price = getRandomPrice();
            const oldPrice = parseFloat((price * 1.2).toFixed(2)); // 20% markup for old price

            // Handle filename encoding if necessary (spaces are usually fine in fs, but URLs might need encoding)
            // But here we just store the path relative to uploads, or just the filename if the frontend handles it.
            // Based on frontend code seen earlier: `http://localhost:4000/uploads/${path}`
            // So we should store the raw filename as imageUrl if we follow `productController.js` logic which did:
            // const imageUrl = filename ? `/uploads/${filename}` : null;
            // Wait, the controller stored `/uploads/${filename}`. 
            // The frontend handled `path.startsWith('/')`.
            // So I should store `/uploads/${file}`.

            products.push({
                name: name.replace(/([A-Z])/g, ' $1').trim(), // Add space before caps if CamelCase (e.g. BananaBread -> Banana Bread)
                description: `Fresh and delicious ${name}.`,
                category: category,
                oldPrice: oldPrice,
                price: price,
                imageUrl: file // Store just the filename as seen in the controller?
                // Let's re-verify the controller.
                // Controller: const imageUrl = filename ? `/uploads/${filename}` : null;
                // So the DB has `/uploads/filename.png`.
            });
        }
        
        // Correcting the imageUrl to match controller logic
        const productsWithCorrectPath = products.map(p => ({
            ...p,
            imageUrl: `/uploads/${p.imageUrl}`
        }));

        if (productsWithCorrectPath.length > 0) {
            await Product.insertMany(productsWithCorrectPath);
            console.log(`Successfully seeded ${productsWithCorrectPath.length} products.`);
        } else {
            console.log('No images found to seed.');
        }

        process.exit();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
