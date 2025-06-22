import mongoose  from "mongoose";


const workoutSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date:{
            type: Date,
            default: Date.now,
        },
        exercises:[
            {
                exercise:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref: "Exercise",
                    required: true,
                },
                sets:{
                    type: Number,
                    required:true,
                },
                reps: {
                    type: Number,
                    required:true,
                },
                weight: {
                    type: Number,
                    required:true,
                },
                comment:{
                    type:String,
                },
            },
        ],
        notes: {
            type:String,
        },
    },
    {timestamps:true}
);

export default mongoose.model("Workout",workoutSchema)