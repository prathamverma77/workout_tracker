import Workout from "../models/Workout.js"

export const createWorkout = async (req, res) =>{
    try {
        const {exercises, date, notes} = req.body;
        const userId = req.user.id;

        if (!exercises || exercises.length ===0) {
            return res.status(400).json({message:"Exercises are required"});
        }

        const newWorkout = new Workout({
            user: userId,
            exercises,
            date,
            notes,
        });
        await newWorkout.save();

        res.status(201).json({
            message:"Workout created",
            workout:newWorkout,
        });
    }catch (error) {
        console.error("Error creating workout", error);
        res.status(500).json({message:"Server error", error:error.message});
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