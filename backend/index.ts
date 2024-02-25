import express from "express";
import WebSocket from "ws";
import http from "http";
import { v4 as uuidv4 } from "uuid";
import { Player, GameState } from "../shared/types/game-types";
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Create a map to store additional properties for each client
const clientData = new Map();

// This object will track the games
let games: {
  [gameId: string]: GameState;
} = {};

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/games/:gameId", (req, res) => {
  const gameId = req.params.gameId;
  console.log("GET /games/:gameId", gameId);
  if (games[gameId]) {
    res.json(games[gameId]);
  } else {
    res.status(404).json({ message: "Game not found" });
  }
});

app.post("/games", (req, res) => {
  const gameId = uuidv4();
  console.log("Creating game", gameId);
  games[gameId] = { players: [], gameInProgress: false };
  res.json({ gameId });
});

wss.on("connection", (ws) => {
  // Add the client to the map with an initial gameId of undefined
  clientData.set(ws, { gameId: undefined });

  ws.on("message", (message) => {
    const { type, data } = JSON.parse(message.toString());
    let gameState: GameState = { players: [], gameInProgress: false };
    let gameId: string | undefined = undefined;
    // If the message includes a gameId, update the client's gameId
    if (data && data.gameId) {
      clientData.get(ws).gameId = data.gameId;
      gameState = games[data.gameId];
      gameId = data.gameId;
    }
    console.log("message", { data, type });

    switch (type) {
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
    console.log("games", games);
    console.log("Broadcasting game state", gameState);
    // Check if the client is in the same game as the player
    clientData.forEach((data, client) => {
      if (data.gameId === gameId) {
        client.send(JSON.stringify(gameState));
      }
    });

    ws.on("close", () => {
      // When the client disconnects, remove it from the map
      clientData.delete(ws);
    });
  });
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
