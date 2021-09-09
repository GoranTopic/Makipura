import express from 'express' ;
import userController from '../controllers/userController.js';

const userRouter = express.Router(); // get express router

userRouter.route('/signup')
		.post(userController.signup);

userRouter.route('/signin')
		.post(userController.signin);

userRouter.route('/signout')
		.post(userController.signout);

userRouter.route('/all/:page?')
		.get(userController.getAllUsers);

userRouter.route('/:username/')
		.get(userController.getUserByUserName)

export default userRouter;
