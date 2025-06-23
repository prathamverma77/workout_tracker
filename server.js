import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import testProtcted from "./routes/testProtected.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

dotenv.config();


const PORT = process.env.PORT || 5000;

const app = express();


//middleware
app.use(express.json());
app.use("/api/auth", authRoutes); // mount the route
app.use("/api/test", testProtcted);


//connectto DB
connectDB();

// Unified root route with full API listing
app.get("/", (req, res) => {
  res.json({
    message: "Workout Tracker API is running!",
    endpoints: [
      "POST /api/auth/register",
      "POST /api/auth/login",
      "GET /api/exercises",
      "POST /api/workouts",
      "GET /api/workouts",
      "GET /api/workouts/:id",
      "PUT /api/workouts/:id",
      "DELETE /api/workouts/:id",
      "GET /api/progress/:exerciseName"
    ]
  });
});
//Routes
//exercise routes from seeder.js for existing exercise for users
app.use("/api/exercises", exerciseRoutes);
//workout.js from routes
app.use("/api/workouts", workoutRoutes);
//progress Routes 
app.use("/api/progress", progressRoutes);


//listening uri
app.listen(PORT, () =>
    console.log(`Server running on http:localhost:${PORT}`)
);

// 404 route handler for unmatched endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
