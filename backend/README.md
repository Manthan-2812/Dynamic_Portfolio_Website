# Portfolio Backend

Backend API for the portfolio website.

## Features
- Express.js server
- MongoDB database connection
- JWT authentication
- Cloudinary file upload
- RESTful API endpoints

## Environment Variables
Create a `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb+srv://portfolioAdmin:Manthu@2877@cluster0.r1anhgq.mongodb.net/portfolio
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## Installation
```bash
npm install
```

## Running the Server
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints
- `GET /` - Health check
- More endpoints coming soon...

## Database
- MongoDB Atlas cluster
- Database: portfolio
