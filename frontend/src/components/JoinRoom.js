import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function JoinRoom({ setJoined, setRoomId, setUsername }) {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  const handleJoin = () => {
    if (room && name) {
      setRoomId(room);
      setUsername(name);
      setJoined(true);
    } else {
      alert("Isi nama dan kode room dulu 💖");
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
      <TextField
        label="Nama Kamu"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Kode Room"
        variant="outlined"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <Button
        variant="contained"
        sx={{ bgcolor: "#e91e63", "&:hover": { bgcolor: "#d81b60" } }}
        onClick={handleJoin}
      >
        Gabung 💌
      </Button>
    </Box>
  );
}
