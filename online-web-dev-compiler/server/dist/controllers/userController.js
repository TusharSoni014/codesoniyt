"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetails = exports.logout = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    try {
        const existingUser = await User_1.User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists!" });
        }
        if (!usernameRegex.test(username)) {
            return res
                .status(400)
                .send({ message: "Some characters are not allowed!" });
        }
        const salt = await bcrypt_1.default.genSalt();
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const user = await User_1.User.create({
            email: email,
            password: hashedPassword,
            username: username,
        });
        const jwtToken = jsonwebtoken_1.default.sign({
            _id: user._id,
            email: user.email,
        }, process.env.JWT_KEY, {
            expiresIn: "1d",
        });
        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "lax",
        });
        return res.status(201).send({
            username: user.username,
            picture: user.picture,
            email: user.email,
            savedCodes: user.savedCodes,
        });
    }
    catch (error) {
        return res.status(500).send({ message: "Error signing up!", error: error });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { userId, password } = req.body;
    try {
        let existingUser = undefined;
        if (userId.includes("@")) {
            existingUser = await User_1.User.findOne({ email: userId });
        }
        else {
            existingUser = await User_1.User.findOne({ username: userId });
        }
        if (!existingUser) {
            return res.status(400).send({ message: "User not found" });
        }
        const passwordMatched = await bcrypt_1.default.compare(password, existingUser.password);
        if (!passwordMatched) {
            return res.status(400).send({ message: "wrong password" });
        }
        const jwtToken = jsonwebtoken_1.default.sign({
            _id: existingUser._id,
            email: existingUser.email,
        }, process.env.JWT_KEY, {
            expiresIn: "1d",
        });
        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "lax",
        });
        return res.status(200).send({
            username: existingUser.username,
            picture: existingUser.picture,
            email: existingUser.email,
            savedCodes: existingUser.savedCodes,
        });
    }
    catch (error) {
        return res.status(500).send({ message: "Error log in!", error: error });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).send({ message: "logged out successfully!" });
    }
    catch (error) {
        return res.status(500).send({ message: "Error logging out!", error });
    }
};
exports.logout = logout;
const userDetails = async (req, res) => {
    const userId = req._id;
    try {
        const user = await User_1.User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "Cannot find the user!" });
        }
        return res.status(200).send({
            username: user.username,
            picture: user.picture,
            email: user.email,
            savedCodes: user.savedCodes,
        });
    }
    catch (error) {
        return res.status(500).send({ message: "Cannot fetch user details" });
    }
};
exports.userDetails = userDetails;
