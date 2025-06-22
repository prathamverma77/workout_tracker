import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import testProtcted from "./routes/testProtected.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";

dotenv.config();


const PORT = process.env.PORT || 5000;

const app = express();


//middleware
app.use(express.json());
app.use("/api/auth", authRoutes); // ✅ mount the route
app.use("/api/test", testProtcted);


//connectto DB
connectDB();


//Routes
//exercise routes from seeder.js for existing exercise for users
app.use("/api/exercises", exerciseRoutes);
//workout.js from routes
app.use("/api/workouts", workoutRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

//listening uri
app.listen(PORT, () =>
    console.log(`Server running on http:localhost:${PORT}`)
);