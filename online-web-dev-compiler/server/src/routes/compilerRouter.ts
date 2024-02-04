import express from "express";
import { saveCode } from "../controllers/compilerController";

export const compilerRouter = express.Router();

compilerRouter.post("/save", saveCode);
