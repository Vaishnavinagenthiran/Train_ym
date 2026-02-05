import {createUserController, getAllUserController, updateUserPasswordController,deleteUserController } from "../Controller/userController.js";

import express from 'express';
const userRoute = express.Router(); // get,put,post,delete


userRoute.post('/signup', createUserController); 
userRoute.get('/getusers', getAllUserController);
userRoute.put('/updatepass/:id', updateUserPasswordController);
userRoute.delete('/deleteuser/:id', deleteUserController);

// http://localhost:5000/api/user/signup

export default userRoute;