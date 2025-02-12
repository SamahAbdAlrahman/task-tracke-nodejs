import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from "express";
import { UserModel } from "../../../DB/models/users.js"; 
import {registerSchema , loginSchema} from "./auth.validation.js";
import validation from "../../middleware/validation.js";
// 
import dotenv from "dotenv";
dotenv.config();

const router = Router();

// register
router.post('/signup', validation(registerSchema),async (req, res) => {
    const { name, email, password ,role} = req.body;
     try {
      const hashPassword = bcrypt.hashSync(password, 8);
      const newUser = await UserModel.create({ name, email, password: hashPassword ,role:role || 'user',});
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user.' });
    }
  });

  // login
  router.post('/login',validation(loginSchema),async(req,res)=>{
    try {
    const {email,password} = req.body;

    const userFinded = await UserModel.findOne({
    where:{email:email}
    });
    if(userFinded == null){
    return res.status(404).json({message:"invaid email"});
    }
    // لانه الباس مشفر المخزن
    const check =  bcrypt.compareSync(password,userFinded.password);
    if(check == false){
    return res.status(400).json({message:"invalid password"});
    }
    // jwt token
    const token = jwt.sign(
      {
        id: userFinded.user_id,
        name: userFinded.name,
        email: userFinded.email,
        role: userFinded.role,  
           },
      process.env.SECRET_KEY,
    );
    console.log("SECRET_KEY:", process.env.SECRET_KEY);

    return res.status(200).json({message:"success",token});
  }
  catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  });
  export default router;