import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
    
  try {
    const { username, email, password, gender } = req.body;

    if (!username || !email || !password || !gender) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.SECRET_ACCESS_TOKEN,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        gender: newUser.gender,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const loginUser = async (req,res) => {
    const{email, password} = req.body;
    try {
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(401).json({
                status:"failed",
                message:"Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({
                status:"failed",
                message:"Invalid email or password"
            })

            
        };
        const token = jwt.sign(
            { id:user._id },
            process.env.SECRET_ACCESS_TOKEN,
            {expiresIn:"1h"}
        );
        
        user.password = undefined;
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                gender: user.gender,
            },
            token,
        });
    }catch(error) {
        res.status(500).json({ message:"server error", error:error.message });
    }
};

