import mongoose from "mongoose";




const exerciseSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:[true,"exercise name is required"]
        },
        description:{
            type: String,

        },
        muscleGroup:{
            type:String,
            required: [true,"Muscle group is required"],

        },
    },
    { timestamps: true}
);

export default mongoose.model("Exercise", exerciseSchema)