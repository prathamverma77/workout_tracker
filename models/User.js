import mongoose from "mongoose";


const UserSchema = new mongoose.Schema (
    {
        username: {
            type: String,
            required: [true,"Username is required"],
            max: 25,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            max: 100,
            unique: true,
        },
        password: {
            type:String,
            required: [true, "password is required"],
            select: false,
        },
        gender: {
            type:String,
            required: [true, "Gender is required"],
        },
        
    },
    { timestamps: true }
)
export default mongoose.model("User",UserSchema);


