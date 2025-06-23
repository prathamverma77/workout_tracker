# workout_tracker
A fitness workout tracking REST API built using Node.js, Express, and MongoDB. It allows users to register, log workouts, track exercise progress, and manage workout data.

## Project URL
- https://workout-tracker-backend-xzdb.onrender.com

## features
- User Authentication (JWT-based)
- CRUD operations on workouts
- Exercise Seeding
- Token-protected routes
- Progress tracking for specific exercises
- Fully deployed backend on Render

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Auth
- Render for deployment

## Testing with Postman
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Create Workout: `POST /api/workouts`
- Get Workouts: `GET /api/workouts`
- Get Workout by ID: `GET /api/workouts/:id`
- Update Workout: `PUT /api/workouts/:id`
- Delete Workout: `DELETE /api/workouts/:id`
- Track Progress: `GET /api/progress/:exerciseName`

## Project Structure
├── controllers/
├── models/
├── routes/
├── middleware/
├── seed/
├── config/
├── .env
└── server.js

## Environment variables
- MONGO_URI - mongodb+srv://vermapratham59:<password>@cluster0.ufrlbho.mongodb.net/
- SECRET_ACCESS_TOKEN - mysecrettoken123

## Author
**Pratham Verma**
