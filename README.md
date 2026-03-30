# Recipto-API

A high-performance Node.js Express API for managing users with advanced bulk operations support. This API is designed to handle large datasets (5,000+ users per request) and includes robust manual validation.

## 🚀 Features

- **Bulk Create**: Create thousands of users in a single request with `insertMany`.
- **Bulk Update**: Efficiently update multiple user records using MongoDB `bulkWrite`.
- **Validation**: Strict validation for emails, 10-digit phone numbers, and full names.
- **Large Payload Support**: Configured to handle up to 10MB JSON requests.
- **MongoDB Integration**: Built with Mongoose for schema-based data modeling.

## 🛠️ Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Mongoose**: MongoDB object modeling
- **Dotenv**: Environment variable management
- **Nodemon**: Development mode auto-restart

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v16.0 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or on Atlas)

## ⚙️ Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file in the root directory (copy from `.env.example`):
   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/recipto
   ```

3. **Start the Server**:
   ```bash
   # For development (with nodemon)
   npm run dev

   # For production
   npm start
   ```

## 📡 API Endpoints

### 1. Bulk Create Users
- **POST** `/api/users/bulk-create`
- **Body**: Array of user objects or a single user object.
- **Rules**: `fullName` (min 3 chars), `email` (unique), `Phone` (unique, 10 digits).

### 2. Bulk Update Users
- **PATCH** `/api/users/bulk-update`
- **Body**: Array of update objects (Each must contain a `Phone` field as a unique identifier).

## 🔒 Security & Performance
- **Payload Limit**: Increased to **10MB** in `src/index.js` to support massive bulk requests.
- **Validation**: Synchronous validation in the controller layer prevents malformed data from reaching the database.
