# 🛒 DEN – Mini E-Commerce Platform

A modern, lightweight e-commerce application designed to showcase products, handle basic orders, and provide a seamless shopping experience. Built with React.js, Tailwind CSS, Node.js, and MongoDB, Den features a responsive UI, dynamic product listings, and a functional backend API for product management.

## Demo

🔗 Live Demo: https://futureinterns-fs-02.vercel.app

## Table of Contents

- About
- Features
- Tech Stack
- Getting Started
- Usage
- Deployment
- Contributing
- License
- About

### DEN is a mini e-commerce platform focused on simplicity and efficiency. It allows users to: 
- Browse products with images, descriptions, and prices
- View product details and stock availability
- Add items to cart (basic cart functionality)
- Showcase featured products
- Easily manage products via a backend API

### This project is perfect for learning full-stack e-commerce development or presenting a portfolio-ready mini-shop.

## Features

- 🛍️ Browse products with dynamic listings
- 🖼️ Product details with images, brand, category, price, and stock info
- ⭐ Product ratings and reviews
- 🏷️ Tags and variants support (size, color, etc.)
- 🔧 Admin-ready backend with MongoDB for product CRUD
- ⚡ Responsive and fast UI built with Tailwind CSS

## Tech Stack

- Frontend: React.js, Tailwind CSS, React Router DOM, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Deployment: Vercel (frontend), Render/Railway/Heroku (backend)

### Getting Started

1. Clone the repository
```
git clone https://github.com/your-username/den.git
cd den
```

2. Backend Setup
```
cd backend
npm install
```

Create a .env file:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start backend server:
```
node server.js
```

3. Frontend Setup
```
cd ../frontend
npm install
npm run dev
```

Visit http://localhost:5173 to see the project locally.

## Usage

- Browse products on the homepage
- Click on products to view details 
- Check stock, price, and variants
- Admin can add, edit, or delete products via backend API
- Deployment

### Frontend: Deploy on Vercel

### Backend: Deploy on Render/Railway/Heroku, make sure to configure environment variables

## Contributing

- Contributions are welcome! You can: 
- Add new features like cart checkout or payment integration
- Improve UI/UX design
- Optimize performance and responsiveness
- Submit pull requests with clear explanations

## License

- This project is licensed under the MIT License.
