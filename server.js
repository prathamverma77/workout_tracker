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

// Debug routes - add these temporarily
app.get('/debug/all-exercises', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json({ count: exercises.length, exercises });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get('/debug/my-workouts', async (req, res) => {
  try {
    const userId = req.user.id;
    const workouts = await Workout.find({ user: userId });
    res.json({ 
      userId,
      count: workouts.length, 
      workouts 
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get('/debug/raw-data', async (req, res) => {
  try {
    const userId = req.user.id;
    const exercises = await Exercise.find();
    const workouts = await Workout.find({ user: userId });
    
    res.json({
      userId,
      exerciseCount: exercises.length,
      workoutCount: workouts.length,
      exercises,
      workouts
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});
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
