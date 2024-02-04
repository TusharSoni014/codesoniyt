import express from "express";
import { loadCode, saveCode } from "../controllers/compilerController";

export const compilerRouter = express.Router();

compilerRouter.post("/save", saveCode);
compilerRouter.post("/load", loadCode);
