"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCodes = exports.editCode = exports.deleteCode = exports.getMyCodes = exports.loadCode = exports.saveCode = void 0;
const Code_1 = require("../models/Code");
const User_1 = require("../models/User");
const saveCode = async (req, res) => {
    const { fullCode, title } = req.body;
    let ownerName = "Anonymous";
    let user = undefined;
    let ownerInfo = undefined;
    let isAuthenticated = false;
    if (req._id) {
        user = await User_1.User.findById(req._id);
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }
        ownerName = user?.username;
        ownerInfo = user._id;
        isAuthenticated = true;
    }
    if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
        return res.status(400).send({ message: "Code cannot be blank!" });
    }
    try {
        const newCode = await Code_1.Code.create({
            fullCode: fullCode,
            ownerName: ownerName,
            ownerInfo: ownerInfo,
            title: title,
        });
        if (isAuthenticated && user) {
            user.savedCodes.push(newCode._id);
            await user.save();
        }
        return res.status(201).send({ url: newCode._id, status: "saved!" });
    }
    catch (error) {
        return res.status(500).send({ message: "Error saving code", error });
    }
};
exports.saveCode = saveCode;
const loadCode = async (req, res) => {
    const { urlId } = req.body;
    const userId = req._id;
    let isOwner = false;
    try {
        const existingCode = await Code_1.Code.findById(urlId);
        if (!existingCode) {
            return res.status(404).send({ message: "Code not found" });
        }
        const user = await User_1.User.findById(userId);
        if (user?.username === existingCode.ownerName) {
            isOwner = true;
        }
        return res.status(200).send({ fullCode: existingCode.fullCode, isOwner });
    }
    catch (error) {
        return res.status(500).send({ message: "Error loading code", error });
    }
};
exports.loadCode = loadCode;
const getMyCodes = async (req, res) => {
    const userId = req._id;
    try {
        const user = await User_1.User.findById(userId).populate({
            path: "savedCodes",
            options: { sort: { createdAt: -1 } },
        });
        if (!user) {
            return res.status(404).send({ message: "Cannot find User!" });
        }
        return res.status(200).send(user.savedCodes);
    }
    catch (error) {
        return res.status(500).send({ message: "Error loading my codes!", error });
    }
};
exports.getMyCodes = getMyCodes;
const deleteCode = async (req, res) => {
    const userId = req._id;
    const { id } = req.params;
    try {
        const owner = await User_1.User.findById(userId);
        if (!owner) {
            return res
                .status(404)
                .send({ message: "Cannot find the owner profile!" });
        }
        const existingCode = await Code_1.Code.findById(id);
        if (!existingCode) {
            return res.status(404).send({ message: "Code not found" });
        }
        if (existingCode.ownerName !== owner.username) {
            return res
                .status(400)
                .send({ message: "You don't have permission to delete this code!" });
        }
        const deleteCode = await Code_1.Code.findByIdAndDelete(id);
        if (deleteCode) {
            return res.status(200).send({ message: "Code Deleted successfully!" });
        }
        else {
            return res.status(404).send({ message: "Code not found" });
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Error deleting code!", error });
    }
};
exports.deleteCode = deleteCode;
const editCode = async (req, res) => {
    const userId = req._id;
    const postId = req.params.id;
    const fullCode = req.body;
    try {
        const owner = await User_1.User.findById(userId);
        if (!owner) {
            return res.status(404).send({ message: "cannot find owner!" });
        }
        const existingPost = await Code_1.Code.findById(postId);
        if (!existingPost) {
            return res.status(404).send({ message: "Cannot find post to edit!" });
        }
        if (existingPost.ownerName !== owner.username) {
            return res
                .status(400)
                .send({ message: "You don't have permission to edit this post!" });
        }
        await Code_1.Code.findByIdAndUpdate(postId, {
            fullCode: fullCode,
        });
        return res.status(200).send({ message: "Post updated successfully" });
    }
    catch (error) {
        return res.status(500).send({ message: "Error editing code!", error });
    }
};
exports.editCode = editCode;
const getAllCodes = async (req, res) => {
    try {
        const allCodes = await Code_1.Code.find().sort({ createdAt: -1 });
        return res.status(200).send(allCodes);
    }
    catch (error) {
        return res.status(500).send({ message: "Error editing code!", error });
    }
};
exports.getAllCodes = getAllCodes;
