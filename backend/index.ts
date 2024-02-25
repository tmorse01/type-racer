import express from "express";
import WebSocket from "ws";
import http from "http";
import { v4 as uuidv4 } from "uuid";
import { Player, GameState } from "../shared/types/game-types";
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// This object will track the games
let games: {
  [gameId: string]: GameState;
} = {};

app.get("/games/:gameId", (req, res) => {
  const gameId = req.params.gameId;
  if (games[gameId]) {
    res.json(games[gameId]);
  } else {
    res.status(404).json({ message: "Game not found" });
  }
});

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const { type, data } = JSON.parse(message.toString());
    const gameState = games[data.gameId];
    switch (type) {
      case "create":
        const gameId = uuidv4();
        games[gameId] = { players: [], gameInProgress: false };
        ws.send(JSON.stringify({ type: "created", data: { gameId } }));
      case "join":
        if (games[data.gameId]) {
          games[data.gameId].players.push({ name: data.name, score: 0 });
        }
        break;
      case "score":
        const player = gameState.players.find(
          (p: Player) => p.name === data.name
        );
        if (player) {
          player.score = data.score;
        }
        break;
      case "start":
        gameState.gameInProgress = true;
        break;
      case "end":
        gameState.gameInProgress = false;
        break;
    }

    // Broadcast the updated game state to all connected clients
    wss.clients.forEach((client: WebSocket & { gameId?: string }) => {
      // Check if the client is in the same game as the player
      if (client.gameId === data.gameId) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(gameState));
        }
      }
    });
  });
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
