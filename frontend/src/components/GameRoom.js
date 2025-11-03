import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Box, Button, Typography, TextField } from "@mui/material";

const socket = io("https://968f4ad1348b.ngrok-free.app", {
  transports: ["websocket", "polling"],
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});


export default function GameRoom({ roomId, username }) {
  const [players, setPlayers] = useState([]);
  const [choice, setChoice] = useState("");
  const [question, setQuestion] = useState("");
  const [received, setReceived] = useState("");

  useEffect(() => {
    socket.emit("join_room", roomId, username);

    socket.on("room_update", (users) => {
      setPlayers(users);
    });

    socket.on("truth_dare_choice", (data) => {
      setChoice(data);
    });

    socket.on("receive_question", (q) => {
      setReceived(q);
    });

    return () => {
      socket.off("room_update");
      socket.off("truth_dare_choice");
      socket.off("receive_question");
    };
  }, [roomId, username]);

  const sendChoice = (c) => {
    socket.emit("truth_dare_choice", roomId, c);
  };

  const sendQuestion = () => {
    if (question.trim() !== "") {
      socket.emit("send_question", roomId, question);
      setQuestion("");
    }
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom color="#e91e63">
        Room: {roomId}
      </Typography>

      <Typography variant="body1" gutterBottom>
        Pemain: {players.map((p) => p.name).join(", ")}
      </Typography>

      <Box mt={3} display="flex" justifyContent="center" gap={2}>
        <Button
          variant="contained"
          onClick={() => sendChoice("Truth")}
          sx={{ bgcolor: "#ff4081" }}
        >
          Truth 💬
        </Button>
        <Button
          variant="contained"
          onClick={() => sendChoice("Dare")}
          sx={{ bgcolor: "#f50057" }}
        >
          Dare 🔥
        </Button>
      </Box>

      {choice && (
        <Typography variant="h6" mt={3}>
          Kamu pilih: <b>{choice}</b>
        </Typography>
      )}

      <Box mt={3}>
        <TextField
          label="Tulis pertanyaan atau tantangan"
          fullWidth
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button
          sx={{ mt: 2, bgcolor: "#e91e63" }}
          variant="contained"
          onClick={sendQuestion}
        >
          Kirim ❤️
        </Button>
      </Box>

      {received && (
        <Typography variant="h6" mt={3} color="#d81b60">
          🎯 Tantangan: {received}
        </Typography>
      )}
    </Box>
  );
}
