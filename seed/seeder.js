import exercises from "./exercises.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Exercise from "../models/Exercise.js";

dotenv.config();

const seedExercises = async () => {
    try {
        await connectDB(); //connect to database

        await Exercise.deleteMany(); //clean existing exercises
        console.log("Old exercises removed");

        await Exercise.insertMany(exercises); //insert dummy ones
        console.log("Exercises seeded successfully");

        process.exit(); //exit the process
    }catch (error) {
        console.error("Error seeding exercises:", error.message);
        process.exit(1);
    }
};

seedExercises();
