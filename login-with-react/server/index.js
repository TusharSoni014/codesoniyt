const express = require("express");
const UserAuthRouter = require("./routes/UserAuthRouter");
const dbConnect = require("./lib/dbConnect");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
require("dotenv").config();

//routes
app.use("/user", UserAuthRouter);

dbConnect();
app.listen(4000, () => {
  console.log("http://localhost:4000");
});
