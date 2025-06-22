import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {getProgressByExercise} from "../controllers/progressController.js";

const router = express.Router();

router.use(verifyToken);//protect route

//Route to get progress for a specific exercise
router.get("/:exerciseName",getProgressByExercise);

export default router;