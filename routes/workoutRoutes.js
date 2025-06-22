import express from "express";
import { 
    createWorkout, 
    getWorkouts, 
   // getWorkoutById, 
    //updateWorkout, 
    //deleteWorkout 
} from "../controllers/workoutController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

//protect all routes below with verifytoken
router.use(verifyToken);

// Routes
router.post("/", createWorkout); // Create workout
router.get("/", getWorkouts); // Get all workouts
//router.get("/:id", getWorkoutById); // Get single workout by id
//router.put("/:id", updateWorkout); // Update workout
//router.delete("/:id", deleteWorkout); // Delete workout

export default router;