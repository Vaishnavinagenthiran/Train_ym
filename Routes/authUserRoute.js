import express from 'express';
import { protect } from '../Middleware/protect.js';    
import { isAdmin } from '../Middleware/adimin.js';
import { authSignup,authLogin } from '../Controller/authUserController.js';

const authUserRoute = express.Router();
authUserRoute.post('/authsign', authSignup)
authUserRoute.post('/authlogin', authLogin)

authUserRoute.get("/profile", protect, (req, res) =>{
    res.json({ message: "protected route", user: req.user });
});
authUserRoute.get('/admin', protect, isAdmin, (req, res) => {
    res.json({ message: "Welcome, admin", user:req.role });
});
   

export default authUserRoute;