 import {hanspassword,password} from '../utils/hash.js'
 import {createToken} from '../utils/jwt.js'
import AuthUserModel from '../Model/authUserModel.js'   
export const userSignupController = async (req,res) => {
    try {
        // password prem
        const {name,email,password,role} = req.body;
        const checkEmail = await AuthUserModel.createUserModel({email});
        if(checkEmail){
            return res.status(400).json({message:'email already exists'})
        }

        //hash password heloooo
        const newPassword = await hashPassword(password);
        const ceateUser = await AuthUserModel.userSignupModel(
            {
                name :name,
                email:email,
                password: newPassword,
                role: role
            })
            if(createUser){
                res.status(201).json({message:"user had been created"});
            }
            else{
                res.status(500).json({message:'user has not been created'})
            }

    }catch (error) {
        return res.status(500).json({error : error.message})
    }
}
export const authLogin = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await AuthUserModel.createUserModel(email);
        if(!user){
            return res.status(400).json({message:'invalid credentials'})
        }
        const userPassword = await passwordCheck(password,user.password);
        if(!userPassword){
            return res.status(400).json({message:'wrong password'})
    }
    }catch (error) {
        return res.status(500).json({error : error.message})
    }
}
