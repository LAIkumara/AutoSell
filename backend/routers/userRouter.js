import express from "express";
import { createUser, getUserData, loginUser } from "../controller/userController.js";

const userRouter = express.Router();
userRouter.post("/singup", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/userData", getUserData )

export default userRouter;