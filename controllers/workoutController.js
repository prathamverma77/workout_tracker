import Workout from "../models/Workout.js";
import Exercise from "../models/Exercise.js";


export const createWorkout = async (req, res) => {
    try {
        const {exercises, date, notes} = req.body;
        const userId = req.user.id;

        if (!exercises || exercises.length === 0) {
            return res.status(400).json({message: "Exercises are required"});
        }

        // Validate all exercises exist
        const populatedExercises = [];
        for (const item of exercises) {
            const foundExercise = await Exercise.findById(item.exercise);
            if (!foundExercise) {
                return res.status(400).json({
                    message: `Exercise with ID ${item.exercise} not found`
                });
            }
            populatedExercises.push(item);
        }

        const newWorkout = new Workout({
            user: userId,
            exercises: populatedExercises,  
            date,
            notes,
        });

        await newWorkout.save();
        res.status(201).json({
            message: "Workout created",
            workout: newWorkout,
        });
    } catch (error) {
        console.error("Error creating workout", error);
        res.status(500).json({message: "Server error", error: error.message});
    }
};

//GET all workouts for the logged in user 

export const getWorkouts = async(req, res) => {
    try {
        const userId = req.user.id;

        const workouts = await Workout.find({user:userId}).sort({createdAt: -1});

        res.status(200).json({
            message: "Workouts fetched successfully",
            workouts,
        });
    
    }catch (error){
        res.status(500).json({
            message: "Server error while fetching workouts",
            error:error.message,
        });
    }
};

// find a specifc workout by id 
export const getWorkoutById = async (req, res)  => {
    try {
        const workoutId = req.params.id;

        const workout = await Workout.findById(workoutId);

        if (!workout) {
            return res.status(404).json({messge:"Workout not found"});
        }
        res.status(200).json({
            message:"workout fetched successfully",
            workout,
        });
    }catch (error) {
        res.status(500).json({message: "server error",error: error.message});
    }
};

//update the workout details like (exercises, date, notes)
export const updateWorkout = async (req, res) => {
    try {
        const workoutId = req.params.id;
        const userId = req.user.id;
        const {exercises, date, notes} = req.body;

        const workout = await Workout.findOne({_id: workoutId, user:userId});

        if (!workout) {
            return res.status(404).json({message:"Workout not found"});
        }

        //update fields
        if (exercises) workout.exercises  = exercises;
        if (date) workout.date = date;
        if (notes) workout.notes = notes;

        await workout.save();
        res.status(200).json({message: "Workout updated", workout});

    }catch(error) {
        res.status(500).json({message:"server error", error:error.message});
    }
};

// controllers/workoutController.js
export const deleteWorkout = async (req, res) => {
    try {
        const workoutId = req.params.id;
        const userId = req.user.id;

        const workout = await Workout.findOneAndDelete({_id:workoutId,user:userId});

        if(!workout) {
            return res.status(404).json({message:"workout not found or already deleted"});
        }
        res.status(200).json({message:"wokout deleted successfully"});
    }catch (error) {
        res.status(500).json({messasge:"server error", error:error.message});
    }
};