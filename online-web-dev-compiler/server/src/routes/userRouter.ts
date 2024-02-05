import express from "express";
import { signup } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.post("/signup", signup);
