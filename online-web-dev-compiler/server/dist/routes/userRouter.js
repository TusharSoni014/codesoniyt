"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const verifyToken_1 = require("../middlewares/verifyToken");
const compilerController_1 = require("../controllers/compilerController");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/signup", userController_1.signup);
exports.userRouter.post("/login", userController_1.login);
exports.userRouter.post("/logout", userController_1.logout);
exports.userRouter.get("/user-details", verifyToken_1.verifyToken, userController_1.userDetails);
exports.userRouter.get("/my-codes", verifyToken_1.verifyToken, compilerController_1.getMyCodes);
