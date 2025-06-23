import mongoose from "mongoose";
import Workout from "../models/Workout.js";
import Exercise from "../models/Exercise.js";


export const getProgressByExercise = async (req, res) => {
  try {
    const userId = req.user.id;
    const exerciseName = req.params.exerciseName;

    console.log("Debug - userId:", userId);
    console.log("Debug - exerciseName:", exerciseName);

    // Find the matching exercise document
    const exercise = await Exercise.findOne({ name: exerciseName });
    console.log("Debug - exercise found:", exercise);

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    // Debug step by step
    const step1 = await Workout.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      }
    ]);
    console.log("Debug - Step 1 (user match):", step1.length, "workouts");

    const step2 = await Workout.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$exercises",
      }
    ]);
    console.log("Debug - Step 2 (after unwind):", step2.length, "exercise entries");

    const progress = await Workout.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$exercises",
      },
      {
        $match: {
          "exercises.exercise": exercise._id,
        },
      },
      {
        $project: {
          _id: 0,
          date: 1,
          sets: "$exercises.sets",
          reps: "$exercises.reps",
          weight: "$exercises.weight",
          comment: "$exercises.comment",
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    console.log("Debug - Final progress:", progress);

    res.status(200).json({
      message: "Progress fetched successfully",
      debug: {
        userId,
        exerciseName,
        exerciseId: exercise._id,
        step1Count: step1.length,
        step2Count: step2.length
      },
      progress,
    });
  } catch (error) {
    console.log("Debug - Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};