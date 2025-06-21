// routes/exerciseRoutes.js
import express from "express";
import Exercise from "../models/Exercise.js";

const router = express.Router();

// GET all exercises
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find({});
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch exercises", error: error.message });
  }
});

export default router;
