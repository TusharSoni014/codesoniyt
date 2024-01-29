const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tusharproject00:MmwDwqmcfCt0KcsS@cluster0.3nziahu.mongodb.net/",
      {
        dbName: "mongo-auth-db",
      }
    );
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("failed to connect to database!");
  }
};

module.exports = dbConnect;
