// Run with: node seed.js
// Populates the database with sample grocery products for testing.
require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product');

const sampleProducts = [
  { name: 'Organic Bananas (1kg)', description: 'Sweet, ripe organic bananas, perfect for smoothies or snacking.', price: 2.49, category: 'Fruits & Vegetables', image: 'https://via.placeholder.com/300x300?text=Bananas', stock: 80, rating: 4.6, numReviews: 210 },
  { name: 'Fresh Broccoli', description: 'Crisp, farm-fresh broccoli florets, rich in vitamins.', price: 1.99, category: 'Fruits & Vegetables', image: 'https://via.placeholder.com/300x300?text=Broccoli', stock: 60, rating: 4.3, numReviews: 88 },
  { name: 'Red Apples (1kg)', description: 'Crunchy, juicy red apples picked at peak freshness.', price: 3.29, category: 'Fruits & Vegetables', image: 'https://via.placeholder.com/300x300?text=Apples', stock: 90, rating: 4.7, numReviews: 175 },
  { name: 'Farm Fresh Eggs (12 pack)', description: 'Free-range eggs from pasture-raised hens.', price: 4.49, category: 'Dairy & Eggs', image: 'https://via.placeholder.com/300x300?text=Eggs', stock: 70, rating: 4.8, numReviews: 260 },
  { name: 'Whole Milk (1L)', description: 'Creamy, farm-fresh whole milk, pasteurized daily.', price: 2.79, category: 'Dairy & Eggs', image: 'https://via.placeholder.com/300x300?text=Milk', stock: 100, rating: 4.5, numReviews: 190 },
  { name: 'Cheddar Cheese Block (400g)', description: 'Aged cheddar cheese with a sharp, rich flavor.', price: 5.99, category: 'Dairy & Eggs', image: 'https://via.placeholder.com/300x300?text=Cheese', stock: 45, rating: 4.6, numReviews: 102 },
  { name: 'Sourdough Loaf', description: 'Freshly baked sourdough bread with a crisp crust.', price: 4.99, category: 'Bakery', image: 'https://via.placeholder.com/300x300?text=Sourdough', stock: 35, rating: 4.9, numReviews: 140 },
  { name: 'Chocolate Croissants (4 pack)', description: 'Buttery, flaky croissants filled with rich chocolate.', price: 5.49, category: 'Bakery', image: 'https://via.placeholder.com/300x300?text=Croissants', stock: 30, rating: 4.7, numReviews: 96 },
  { name: 'Whole Wheat Bagels (6 pack)', description: 'Hearty whole wheat bagels, great for breakfast.', price: 3.99, category: 'Bakery', image: 'https://via.placeholder.com/300x300?text=Bagels', stock: 50, rating: 4.3, numReviews: 71 },
  { name: 'Orange Juice (1L)', description: '100% pure squeezed orange juice, no added sugar.', price: 3.49, category: 'Beverages', image: 'https://via.placeholder.com/300x300?text=Orange+Juice', stock: 65, rating: 4.4, numReviews: 110 },
  { name: 'Sparkling Water (6 pack)', description: 'Refreshing sparkling water, naturally carbonated.', price: 4.29, category: 'Beverages', image: 'https://via.placeholder.com/300x300?text=Sparkling+Water', stock: 90, rating: 4.2, numReviews: 58 },
  { name: 'Ground Coffee (500g)', description: 'Medium roast ground coffee with a smooth, bold flavor.', price: 7.99, category: 'Beverages', image: 'https://via.placeholder.com/300x300?text=Coffee', stock: 40, rating: 4.8, numReviews: 220 },
  { name: 'Mixed Nuts (300g)', description: 'A crunchy mix of almonds, cashews, and walnuts.', price: 6.49, category: 'Snacks', image: 'https://via.placeholder.com/300x300?text=Mixed+Nuts', stock: 55, rating: 4.5, numReviews: 132 },
  { name: 'Potato Chips (Family Pack)', description: 'Crispy, lightly salted potato chips.', price: 3.29, category: 'Snacks', image: 'https://via.placeholder.com/300x300?text=Chips', stock: 100, rating: 4.1, numReviews: 89 },
  { name: 'Granola Bars (8 pack)', description: 'Oats and honey granola bars, perfect on-the-go snack.', price: 4.79, category: 'Snacks', image: 'https://via.placeholder.com/300x300?text=Granola+Bars', stock: 70, rating: 4.4, numReviews: 105 },
  { name: 'Chicken Breast (1kg)', description: 'Skinless, boneless chicken breast, hormone-free.', price: 8.99, category: 'Meat & Seafood', image: 'https://via.placeholder.com/300x300?text=Chicken', stock: 30, rating: 4.6, numReviews: 76 },
  { name: 'Atlantic Salmon Fillet (500g)', description: 'Fresh Atlantic salmon fillet, rich in omega-3.', price: 12.99, category: 'Meat & Seafood', image: 'https://via.placeholder.com/300x300?text=Salmon', stock: 20, rating: 4.7, numReviews: 54 },
  { name: 'Frozen Mixed Vegetables (1kg)', description: 'A convenient blend of peas, carrots, and corn.', price: 3.79, category: 'Frozen Foods', image: 'https://via.placeholder.com/300x300?text=Frozen+Veg', stock: 60, rating: 4.2, numReviews: 48 },
  { name: 'Frozen Pizza (Margherita)', description: 'Stone-baked margherita pizza, ready in 12 minutes.', price: 5.99, category: 'Frozen Foods', image: 'https://via.placeholder.com/300x300?text=Frozen+Pizza', stock: 40, rating: 4.3, numReviews: 91 },
  { name: 'Dish Soap (750ml)', description: 'Grease-cutting dish soap with a fresh citrus scent.', price: 2.99, category: 'Household', image: 'https://via.placeholder.com/300x300?text=Dish+Soap', stock: 80, rating: 4.4, numReviews: 63 },
  { name: 'Paper Towels (6 rolls)', description: 'Extra-absorbent, tear-resistant paper towels.', price: 6.99, category: 'Household', image: 'https://via.placeholder.com/300x300?text=Paper+Towels', stock: 75, rating: 4.5, numReviews: 82 },
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log(`Sample grocery products imported successfully! (${sampleProducts.length} items)`);
    process.exit();
  } catch (err) {
    console.error('Error importing data:', err.message);
    process.exit(1);
  }
};

importData();
