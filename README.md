# FreshMart — Grocery Store Website (Bacola-Inspired Layout)

A complete e-commerce web application built with:
- **Frontend:** React.js, Bootstrap 5, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Auth:** JWT-based authentication

## Folder Structure

```
e-commerce/
├── backend/          # Node.js + Express API
│   ├── config/       # Database connection
│   ├── models/       # Mongoose schemas (Product, User, Order)
│   ├── routes/       # API routes (auth, products, orders)
│   ├── middleware/   # JWT auth middleware
│   ├── seed.js        # Script to load sample products
│   └── server.js      # App entry point
└── frontend/          # React application
    ├── public/
    └── src/
        ├── components/  # Navbar, Footer, ProductCard, PrivateRoute
        ├── context/      # CartContext, AuthContext (global state)
        ├── pages/        # Home, ProductDetail, Cart, Login, Register, Checkout, Orders
        └── services/     # api.js (Axios calls to backend)
```

## Features
- Grocery-store homepage layout inspired by the Bacola WooCommerce theme:
  - Top utility bar + header with search, account, and cart
  - Category navigation strip and circular category-icon grid
  - Hero banner with promo side card
  - "Deals of the Day" section with a live countdown timer
  - Tabbed product sections (Best Sellers / New Arrivals / On Sale)
  - Promo banner strip + newsletter signup
  - Multi-column footer
- Browse & search products, filter by category
- Product detail pages
- Shopping cart (persisted in localStorage)
- User registration & login (JWT)
- Checkout flow with shipping address & payment method
- Order history for logged-in users
- Admin-only product create/update/delete endpoints (via API)

## Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB running locally, or a MongoDB Atlas connection string

## Setup Instructions

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set MONGO_URI and JWT_SECRET

# (Optional) Load sample products into the database
node seed.js

# Start the server
npm run dev      # with nodemon (auto-restart)
# or
npm start
```

The API will run at `http://localhost:5000`.

### 2. Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if your backend runs on a different URL

npm start
```

The React app will run at `http://localhost:3000` and will proxy API calls to the backend URL set in `.env`.

## API Endpoints

| Method | Endpoint               | Description                    | Auth       |
|--------|-------------------------|--------------------------------|------------|
| POST   | /api/auth/register      | Register a new user            | Public     |
| POST   | /api/auth/login         | Login and receive a JWT        | Public     |
| GET    | /api/auth/profile       | Get logged-in user's profile   | Private    |
| GET    | /api/products           | List/search products           | Public     |
| GET    | /api/products/:id       | Get a single product           | Public     |
| POST   | /api/products           | Create a product               | Admin only |
| PUT    | /api/products/:id       | Update a product               | Admin only |
| DELETE | /api/products/:id       | Delete a product                | Admin only |
| POST   | /api/orders             | Place an order                 | Private    |
| GET    | /api/orders/myorders    | Get logged-in user's orders    | Private    |
| GET    | /api/orders/:id         | Get a single order             | Private    |

## Making a User an Admin

By default, new users are not admins. To make a user an admin, connect to your MongoDB database and set `isAdmin: true` on their user document, e.g. using the MongoDB shell or Compass:

```js
db.users.updateOne({ email: "you@example.com" }, { $set: { isAdmin: true } })
```

## Notes
- This is a learning/starter-scale project. For production use, add input validation libraries, rate limiting, HTTPS, a real payment gateway (Stripe/PayPal), image uploads (e.g. Cloudinary), and proper error monitoring.
- Product images use placeholder URLs by default — swap in real image URLs or an upload flow as needed.
