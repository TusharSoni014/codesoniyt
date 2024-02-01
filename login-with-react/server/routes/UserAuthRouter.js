const express = require("express");
const {
  signup,
  login,
  logout,
  myDetails,
} = require("../controllers/UserAuthController");
const { verifyToken } = require("../middlewares/verifytoken");
const UserAuthRouter = express.Router();

UserAuthRouter.post("/signup", signup);
UserAuthRouter.post("/login", login);
UserAuthRouter.post("/logout", logout);

UserAuthRouter.get("/my-details", verifyToken, myDetails);

module.exports = UserAuthRouter;
