"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI, {
            dbName: "wd-compiler",
        });
        console.log("connection established!");
    }
    catch (error) {
        console.log("error connecting to database");
    }
};
exports.dbConnect = dbConnect;
