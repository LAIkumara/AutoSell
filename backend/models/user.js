import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userID: { type: String,unique: true,required: true,},
    userName: { type: String},
    email: { type: String,required: true,unique: true,match: /.+\@.+\..+/},
    password: { type: String, required: true },
    phone: { type: String, match: /^\d{10}$/ },
    isBlocked:{ type: Boolean, default: false },
    role: { type: String, default: "customer" },
    isEmailVerified: { type: Boolean, default: false },
    profilePic: { type: String, default: "https://digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png"},
    address: { type: String, default: "No Address" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const User = mongoose.model("users", userSchema)

export default User;