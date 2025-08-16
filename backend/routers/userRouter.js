import express from "express";
import { createUser, getUserData, loginUser, updateUser } from "../controller/userController.js";

const userRouter = express.Router();
userRouter.post("/singup", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/userData", getUserData )
userRouter.put("/updateUserData/:userID", updateUser);

export default userRouter;