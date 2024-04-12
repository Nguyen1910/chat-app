require("dotenv").config();
const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const friendRoute = require("./routes/friendRoute");
const conversationRoute = require("./routes/conversationRoute");
const messageRoute = require("./routes/messageRoute");
const { app, server } = require("./socket/socket");
const { errorHandler } = require("./middlewares/errorHandler");
const { jwtAuth } = require("./middlewares/jwtAuth");
require("express-async-errors");

app.use(cors());

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_UI);
    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();

// app.use("/api/student", studentRoute);

app.use("/api/auth", authRoute);
app.use("/api/user", jwtAuth, userRoute);
app.use("/api/friend", jwtAuth, friendRoute);
app.use("/api/conversation", jwtAuth, conversationRoute);
app.use("/api/message", jwtAuth, messageRoute);

app.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
