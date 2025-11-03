const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const rooms = {}; // Simpan daftar pemain di tiap room

app.get("/", (req, res) => {
  res.send("💞 Truth or Dare Online Backend aktif 💞");
});

io.on("connection", (socket) => {
  console.log("🔗 User connected:", socket.id);

  socket.on("join_room", (roomId, username) => {
    socket.join(roomId);
    if (!rooms[roomId]) rooms[roomId] = [];
    rooms[roomId].push({ id: socket.id, name: username });
    io.to(roomId).emit("room_update", rooms[roomId]);
  });

  socket.on("truth_dare_choice", (roomId, choice) => {
    io.to(roomId).emit("truth_dare_choice", choice);
  });

  socket.on("send_question", (roomId, question) => {
    io.to(roomId).emit("receive_question", question);
  });

  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter(p => p.id !== socket.id);
      io.to(roomId).emit("room_update", rooms[roomId]);
    }
    console.log("❌ Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
