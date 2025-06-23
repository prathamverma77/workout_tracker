import mongoose from "mongoose";
import Workout from "../models/Workout.js";
import Exercise from "../models/Exercise.js";

export const getProgressByExercise = async (req, res) => {
  try {
    const userId = req.user.id;
    const exerciseName = req.params.exerciseName;

    // Find the matching exercise document
    const exercise = await Exercise.findOne({ name: exerciseName });

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

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

    res.status(200).json({
      message: "Progress fetched successfully",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};