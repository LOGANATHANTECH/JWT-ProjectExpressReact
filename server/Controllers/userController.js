import express from "express";
import {createUser,loginUser } from "../service/userService.js"; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const UserRouter = express.Router();

// Example route

// UserRouter.get("/admin", async (req, res) => {
//     try {
//         const adminUser = await getAdminUser();
//         res.status(200).json(adminUser);
//     } catch (error) {
//         res.status(500).send({
//             message: "Could not fetch admin user",
//             error: error.message
//         });

//     }
// });


// UserRouter.get("/", async (req, res) => {
//     console.log("Fetching all users...");
    
//     try {
//         const users = await getAllUsers();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({
//             message:"Could not fetch users",
//             error: error.message
//         } );
        
//     }
// });


// login route
UserRouter.get("/login", (req, res) => {
  res.send("Login endpoint is working");
});


// create user route
UserRouter.post("/register", async(req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).send(`status : ok ${newUser}`);

    } catch (error) {
        res.status(500).json({
            message:"something went wrong while creating user ",
            error: error.message
        } );
    }
   
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email||!password) {
    return res.status(400).send({ message: "Username and password are required." });
    
  }
  try {
    const user = await loginUser(email, password);
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
  
    res.status(200).send({user:user, token: token });
  } catch (error) {
    console.log("===============error while login");
    res.status(401).send({ message: error.message });
    
  }
  // if (username === "karthik" && password === "12345") {
  //   console.log("login succesfull ! ");
    
  //   res.status(200).send({ message: "login success" });
  // }
  // console.log("login failed");
  
  // res.status(401).send({ message: "invalid credentials" });
});



// UserRouter.delete("/:id", async (req, res) => {
//     const userId = parseInt(req.params.id,10);
//     if (isNaN(userId)) {
//         return res.status(400).json({ message: "Invalid user ID provided." });
//     }
//     try {
//         const deletedUser = await deleteUser(userId);
//         res.status(200).json({
//             message: `User with ID ${userId} deleted successfully.`,
//             deletedUser: deletedUser
//         });
//     } catch (error) {
//             return res.status(404).json({ message: error.message });
//     }       
// });

export default UserRouter;