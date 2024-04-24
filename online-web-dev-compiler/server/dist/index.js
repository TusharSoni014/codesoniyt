"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const dbConnect_1 = require("./lib/dbConnect");
const compilerRouter_1 = require("./routes/compilerRouter");
const userRouter_1 = require("./routes/userRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:5173", process.env.CLIENT_URL],
}));
(0, dotenv_1.config)();
app.use("/compiler", compilerRouter_1.compilerRouter);
app.use("/user", userRouter_1.userRouter);
(0, dbConnect_1.dbConnect)();
app.listen(4000, () => {
    console.log("http://localhost:4000");
});
