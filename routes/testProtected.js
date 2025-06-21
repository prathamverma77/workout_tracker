import express from "express";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    user: req.user,
  });
});

export default router;
