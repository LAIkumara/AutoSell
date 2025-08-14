import express from 'express';
import dotenv from "dotenv"
import mongoose from 'mongoose';
import bodyParser from "body-parser"
import jwt, { decode } from "jsonwebtoken"
import cors from "cors";
import categoryRouter from './routers/categoryRouter.js';
import userRouter from './routers/userRouter.js';

dotenv.config();


const app = express();
app.use(bodyParser.json())
app.use(cors())


// app.use(
//     (req, res, next)=>{
//     const value =req.header("Authorization")
//     if(value != null){
//         const token = value.replace("Bearer ", "")
//         jwt.verify(
//             token,
//             process.env.JWT_SECRET,
//             (err,decoded)=>{
//                 if(decoded ==null){
//                     res.status(403).json({
//                         message : "Unauthorized"
//                     })
//                 }else{
//                     req.user =decoded
//                     next()
//                 }
//             }
//         )
//     }else{
//         next()
//     }

// })


const connectionString = process.env.MONGO_URL

mongoose.connect(connectionString).then(()=>{
    console.log("Connected to database")
}).catch(()=>{
    console.log("Database Connection is faild")
})




app.use("/api/auth/category", categoryRouter);
app.use("/api/auth/user", userRouter);
app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})