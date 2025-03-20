const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const port = 4000;
const app = express();
const server = http.createServer(app);

// CORS Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const userSocketMap = {}; // Stores userId -> socketId mappings

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Register a user
  socket.on("register", (userId) => {
    if (!userId) return;
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
  });

  // Handle sending messages
  socket.on("sendMessage", ({ userId, toUserId, message }) => {
    if (!userId || !toUserId || !message) return;

    const recipientSocketId = userSocketMap[toUserId];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveMessage", {
        from: userId,
        message,
      });
    } else {
      console.log(`User ${toUserId} is not connected.`);
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    // Remove user from the map
    Object.keys(userSocketMap).forEach((userId) => {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
      }
    });
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
