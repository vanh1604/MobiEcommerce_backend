import  express  from "express";
import { createUser, loginUser, updateUser } from "../controllers/UserController.js";
const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.post ('/update-user/:id', updateUser)
export default userRouter;
