# VeriNews - Fake News Detection Web Application

A full-stack application for detecting potentially fake news using rule-based analysis.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, Axios, Lucide Icons, React Router
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, BcryptJS

## Prerequisites
- Node.js installed
- MongoDB installed or a MongoDB Atlas account

## Setup Instructions

### 1. Database Configuration
Update the `.env` file in the `server` directory with your MongoDB connection string and a secret key for JWT.

**`server/.env` example:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fake-news-detector
JWT_SECRET=your_super_secret_jwt_key_123
NODE_ENV=development
```

### 2. Backend Installation
```bash
cd server
npm install
```

### 3. Frontend Installation
```bash
cd client
npm install
```

### 4. Running the Application
Open two terminals:

**Terminal 1 (Backend):**
```bash
cd server
node index.js
```

**Terminal 2 (Frontend):**
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`.

## Features
- User authentication with JWT
- Rule-based news analysis (keywords, punctuation, uppercase)
- Analysis history for each user
- Dashboard with statistics
- Responsive design with Tailwind CSS