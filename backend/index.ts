import express from "express";
import WebSocket from "ws";
import http from "http";
import { v4 as uuidv4 } from "uuid";
import url from "url";

import { Player, GameState } from "../shared/types/game-types";
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// This object will track the games
let games: {
  [gameId: string]: GameState;
} = {};

let defaultGameState: GameState = {
  players: [],
  inProgress: false,
};

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/games/:gameId", (req, res) => {
  const gameId = req.params.gameId;
  console.log("GET /games/:gameId", gameId, games);
  if (games[gameId]) {
    res.json(games[gameId]);
  } else {
    res.status(404).json({ message: "Game not found" });
  }
});

app.post("/create", (req, res) => {
  const gameId = uuidv4();
  games[gameId] = { ...defaultGameState };
  res.json({ result: gameId });
});

wss.on("connection", (ws: WebSocket, request: http.IncomingMessage) => {
  const parsedUrl = url.parse(request.url || "", true);
  const gameId = parsedUrl.query.gameId as string;

  console.log(`Client Connected to Game ID: ${gameId}`);

  ws.on("message", (message) => {
    const { type, data } = JSON.parse(message.toString());
    console.log("message", { data, type });
    const gameState = games[gameId];

    switch (type) {
      case "join":
        console.log("join: ", data, gameId, games);
        // pick an element that isn't already taken
        const element = getNonTakenElement(gameState);
        gameState.players = [
          ...gameState.players,
          { name: data.name, score: 0, element },
        ];

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
        gameState.inProgress = true;
        break;
      case "end":
        gameState.inProgress = false;
        break;
    }

    // Broadcast the updated game state to all connected clients
    console.log("Broadcasting game state", gameState);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "update", result: gameState }));
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});

// helper functions
function getNonTakenElement(gameState: GameState): string {
  const elements = ["Fire", "Water", "Earth", "Air"];
  const takenElements = gameState.players.map((p: Player) => p.element);
  const availableElements = elements.filter((e) => !takenElements.includes(e));
  return availableElements[0];
}
