# FreshHive Grocery Application

Welcome to the FreshHive Grocery Application! This project consists of three main components:
1.  **Backend**: The Node.js/Express API server.
2.  **Admin Panel**: A React-based dashboard for managing products and orders.
3.  **Frontend**: A React-based e-commerce store for customers.

## Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or higher recommended)
-   [MongoDB](https://www.mongodb.com/) (Local or Atlas connection string)

---

## 1. Backend Setup

The backend handles API requests, database interactions, and authentication.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `backend` directory with the following keys:
    ```env
    MONGO_URI=mongodb://localhost:27017/freshhive  # Or your MongoDB Atlas URI
    JWT_SECRET=your_jwt_secret_key_here
    STRIPE_SECRET_KEY=your_stripe_secret_key_here
    FRONTEND_URL=http://localhost:5173
    PORT=4000
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:4000`.

---

## 2. Admin Panel Setup

The admin panel is for store owners to manage inventory and orders.

1.  **Navigate to the admin directory:**
    ```bash
    cd admin
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The admin panel will typically run on `http://localhost:5174` (or similar).

    **Note:** The Admin Panel expects the backend to be running at `http://localhost:4000`.

---

## 3. Frontend Setup

The frontend is the customer-facing e-commerce website.

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend will typically run on `http://localhost:5173`.

    **Note:** The Frontend expects the backend to be running at `http://localhost:4000`.

---

## Troubleshooting

-   **API Connection Errors:** Ensure the backend server is running on port `4000`. If you change the backend port, you will need to update the hardcoded URLs in `admin/src` and `frontend/src`.
-   **Database Errors:** Ensure your MongoDB instance is running and the `MONGO_URI` in `backend/.env` is correct.
-   **Image Loading Issues:** Images uploaded via the Admin panel are served by the Backend from the `uploads/` directory. Ensure the backend is running to view these images.
