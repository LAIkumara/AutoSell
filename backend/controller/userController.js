import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export function createUser(req, res) {
    const passwordHash = bcrypt.hashSync(req.body.password, 10);

    const userData = {
        userID: req.body.userID,
        userName: req.body.userName,
        email: req.body.email,
        password: passwordHash,
        phone: req.body.phone,
        isBlocked: req.body.isBlocked || false,
        role: req.body.role || "customer",
        isEmailVerified: req.body.isEmailVerified || false,
        profilePic: req.body.profilePic || "https://digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png",
        address: req.body.address || "No Address",
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const user = new User(userData);
    user.save()
        .then(savedUser => {
            res.status(201).json({
                message: "User created successfully",
                user: savedUser
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error creating user",
                error: error.message
            });
        });
}

export function loginUser(req, res) {

    const password = req.body.password;
    const email = req.body.email;

    User.findOne({
        email: email
    }).then(user => {
        if (user == null) {
            return res.status(404).json({
                message: "User not found"
            });
        }else {
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            const isUserEmailValid = user.email == email;

            if (isUserEmailValid){
                if (isPasswordValid) {
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userName: user.userName,
                            email: user.email,
                            phone: user.phone,
                            role: user.role,
                            isEmailVerified: user.isEmailVerified,
                            profilePic: user.profilePic,
                            address: user.address,
                            isBlocked: user.isBlocked,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt
                        },
                        process.env.JWT_SECRET,
                    ) 
                    res.json({
                        message: "Login successful",
                        token: token,
                        user: {
                            email: user.email,
                            userName: user.userName,
                            email: user.email,
                            phone: user.phone,
                            role: user.role,
                        }
                    })
                            
    
                        } else {
                    return res.status(401).json({
                        message: "Invalid password"
                    }
                    )
                }
            } else {
                return res.status(401).json({
                    message: "Invalid email"
                });
            }

            

        }
    })

}