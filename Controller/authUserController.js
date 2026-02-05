 import {hashPassword,passwordCheck} from '../utils/hash.js'
 import {createToken} from '../utils/token.js'
import AuthUserModel from '../Model/authUserModel.js'   
import unserRoute from '../Routes/userRoute.js'


export const authSignup = async (req,res) => {
    try {
        // password prem
        const {name,email,password,role} = req.body;
        const checkEmail = await AuthUserModel.createUserModel(email);
        if(checkEmail){
            return res.status(400).json({message:'email already exists'})
        }

        //hash password heloooo
        const newPassword = await hashPassword(password);
        const id = await AuthUserModel.userSignupModel(
            {
                name,
                email,
                password: newPassword,
                role: role || "user"
            })
                res.status(201).json({message:"user had been created",userId: id});

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
        const checkPassword = await passwordCheck(password,user.password);
        if(!checkPassword){
            return res.status(400).json({message:'wrong password'})
    }
    const token = createToken({
        id : user.id,
        role : user.role
    })
    res.status(200).json({ message: "login successfully",token })
    }catch (error) {
        return res.status(500).json({error : error.message})
    }
}
