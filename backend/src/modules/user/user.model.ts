import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: true,
        default: "user",
    },
    password: {
        type: String,
        requried: true,
        select: false,
    }
}, { timestamps: true });


const User = mongoose.model('users', userSchema);

export default User;
