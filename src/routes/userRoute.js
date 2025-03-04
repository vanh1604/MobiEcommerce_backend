import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserDetails,
  loginUser,
  refreshToken,
  updateUser,
} from "../controllers/UserController.js";
import { authMiddleware, authUserMiddleware } from "../middleware/authMiddleware.js";
const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/update-user/:id", updateUser);
userRouter.delete("/delete-user/:id", authMiddleware, deleteUser);
userRouter.get("/get-user", authMiddleware, getAllUser);
userRouter.get("/getUser-detail/:id", authUserMiddleware, getUserDetails);
userRouter.get('/refresh-token', refreshToken);
export default userRouter;
