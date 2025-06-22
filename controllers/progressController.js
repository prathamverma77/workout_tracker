import mongoose from "mongoose";
import Workout from "../models/Workout.js"

//GET /api/progress/:exerciseName

export const getProgressByExercise = async (req, res) => {
    try {
        const userId = req.user.id;

        const exerciseName = req.params.exerciseName;

        const progress = await Workout.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
                    "exercises.name": exerciseName,
                },
            },
            {
                $unwind:"$exercises",
            },
            {
                $match: {
                    "exercise.name": exerciseName,
                },
            },
            {
                $project: {
                    _id:0,
                    date:1,
                    sets:"$exercises.sets",
                    reps:"$exercises.reps",
                    weight:"$exercises.weight",
                },
            },
            {
                $sort: {date:1},
            },
        ]);

        res.status(200).json({
            message:"Progress fetched successfully",
            progress,
        });
    }catch(error){
        res.status(500).json({
            message:"server error",
            error:error.message,
        });
    }
};