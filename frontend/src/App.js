import React, { useState } from "react";
import { Container, Typography, Box, Card } from "@mui/material";
import JoinRoom from "./components/JoinRoom";
import GameRoom from "./components/GameRoom";

export default function App() {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  return (
    <Container sx={{ mt: 5, textAlign: "center" }}>
      <Card
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
          bgcolor: "#fff3f8"
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#e91e63" gutterBottom>
          💞 Truth or Dare Online 💞
        </Typography>

        {!joined ? (
          <JoinRoom setJoined={setJoined} setRoomId={setRoomId} setUsername={setUsername} />
        ) : (
          <GameRoom roomId={roomId} username={username} />
        )}
      </Card>
    </Container>
  );
}
