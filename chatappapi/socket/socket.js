const { Server } = require("socket.io");
const express = require("express");
const { createServer } = require("http");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cookie: true,
  cors: {
    origin: [process.env.BASE_URL_APP],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("connect", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  socket.on("callUser", ({ signal, name, from, to }) => {
    io.to(userSocketMap[to]).emit("callUser", { signal, from, name });
  });

  socket.on("answerCall", ({ signal, to }) => {
    io.to(userSocketMap[to]).emit("callAccepted", {
      signal,
    });
  });

  socket.on("leaveCall", ({ to, noReply = false }) => {
    io.to(userSocketMap[to]).emit("leaveCall", { noReply });
  });

  io.emit("getUserOnline", Object.keys(userSocketMap));

  console.log(userSocketMap);

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getUserOnline", Object.keys(userSocketMap));
  });

  // socket.once("disconnect", () => {
  //   socket.emit("getUserOnline", Object.keys(userSocketMap));
  // });
});

const getReceiver = (receiverId) => {
  return userSocketMap[receiverId];
};

const sendData = (receiverId, prefix, data) => {
  io.to(getReceiver(receiverId)).emit(prefix, data);
};

module.exports = { app, io, server, getReceiver, sendData };
