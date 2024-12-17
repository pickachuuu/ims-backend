# Inventory Management System (IMS)

A modern web-based Inventory Management System built with React and Express.js, featuring real-time stock tracking, supplier management, and business analytics.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0 or higher)
- MySQL (via XAMPP)
- Git

## Installation

### 1. Setting up the Database
1. Install and start XAMPP
2. Start Apache and MySQL services
3. Open phpMyAdmin (http://localhost/phpmyadmin)
4. Create a new database named `ims_db`

### 2. Backend Setup
1. Clone the backend repository:
   ```
   git clone https://github.com/pickachuuu/ims-backend.git
   cd my-ims-backend
   ```

2. Install Node dependencies:
   ```
   npm install
   ```

3. Create environment file:
   ```
   cp .env.example .env
   ```

4. Configure your `.env` file:
   ```
   DB_NAME=ims_db
   DB_USER=root
   DB_PASSWORD=
   DB_HOST=localhost
   DB_PORT=3306
   JWT_SECRET=your_jwt_secret_key
   ```

5. Run Sequelize migrations:
   ```
   npx sequelize-cli db:migrate
   ```

6. Start the Express server:
   ```
   npm start
   ```
   or for development:
   ```
   npm run dev
   ```

### 3. Frontend Setup
1. Clone the frontend repository:
   ```
   git clone https://github.com/pickachuuu/ims-frontend.git
   cd my-ims-frontend
   ```

2. Install Node dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the frontend root directory:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Register a new account or login with existing credentials
3. Complete the business setup when prompted
4. Start managing your inventory!

## Features

- **User Authentication**: Secure login and registration process for users, ensuring that only authorized personnel can access the system.
- **Business Profile Management**: Users can create and manage their business profiles, including details like business name, address, and contact information.
- **Product Management**: Add, update, and delete products in the inventory, with options to track stock levels and product details.
- **Category Management**: Organize products into categories for easier navigation and management.
- **Supplier Management**: Maintain a list of suppliers, including contact information and product offerings.
- **Low Stock Alerts**: Receive notifications when stock levels fall below a specified threshold, helping to prevent stockouts.
- **Dashboard Analytics**: Visualize key metrics and analytics related to inventory, sales, and supplier performance through an interactive dashboard.
- **Responsive Design**: The application is designed to work seamlessly on various devices, including desktops, tablets, and smartphones.
- **PDF Report Generation**: Generate detailed PDF reports for inventory, sales, and supplier data, allowing for easy sharing and printing of important information.

## Customization

### Disabling Animations
To disable the animations in the application:
1. Open `src/pages/HomePage.jsx`
2. Locate the animation section (around lines 120-150)
3. Comment out the animation code block to disable all animations

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Bootstrap
- Axios
- React Toastify

### Backend
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication
- Express Middleware
- Node.js

## Pages Demo
![recording (7)](https://github.com/user-attachments/assets/d5da8389-beb0-4623-9510-d134681221ba)


