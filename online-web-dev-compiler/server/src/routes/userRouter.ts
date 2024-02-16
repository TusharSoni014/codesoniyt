import express from "express";
import {
  login,
  logout,
  signup,
  userDetails,
} from "../controllers/userController";
import { verifyToken } from "../middlewares/verifyToken";
import { getMyCodes } from "../controllers/compilerController";
export const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

userRouter.get("/user-details", verifyToken, userDetails);
userRouter.get("/my-codes", verifyToken, getMyCodes);
