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

let clients: {
  [gameId: string]: WebSocket[];
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
  // console.log("GET /games/:gameId", gameId, games);
  if (games[gameId]) {
    res.json(games[gameId]);
  } else {
    res.status(404).json({ message: "Game not found" });
  }
});

app.post("/create", (req, res) => {
  const gameId = uuidv4();
  games[gameId] = { ...defaultGameState };
  clients[gameId] = [];
  res.json({ result: gameId });
  startCountdown(gameId);
});

wss.on("connection", (ws: WebSocket, request: http.IncomingMessage) => {
  // Add the client to the map with an initial gameId of undefined
  console.log("request.url", request.url);
  const parsedUrl = request.url ? url.parse(request.url, true) : null;
  const gameId = parsedUrl?.query?.gameId as string | undefined;

  console.log("Client connected gameId", gameId);
  if (gameId) {
    if (clients[gameId] === undefined) {
      // First user to connect to the game
      clients[gameId] = [ws];
    } else {
      // Add additional users to the game
      clients[gameId].push(ws);
    }
  }

  ws.on("message", (message) => {
    const { type, data } = JSON.parse(message.toString());
    console.log("message", { data, type });

    let gameState: GameState = { ...defaultGameState };

    // If the message includes a gameId, update the client's gameId
    if (data && data.gameId) {
      gameState = games[data.gameId];
    }

    switch (type) {
      case "join":
        console.log("join: ", data);
        if (games[data.gameId]) {
          // pick an element that isn't already taken
          const element = getNonTakenElement(gameState);
          games[data.gameId].players.push({
            name: data.name,
            score: 0,
            element: element,
          });
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
        gameState.inProgress = true;
        break;
      case "end":
        gameState.inProgress = false;
        break;
    }

    // Broadcast the updated game state to all connected clients
    console.log("Broadcasting game state");
    // Check if the client is in the same game as the player
    if (data !== undefined && data.gameId !== undefined) {
      if (clients[data.gameId] !== undefined) {
        clients[data.gameId].forEach((client) => {
          client.send(JSON.stringify({ type: "update", result: gameState }));
        });
      }
    }

    ws.on("close", () => {
      console.log("Client disconnected");
      // Remove the client from the clients object
      if (clients[data.gameId]) {
        const index = clients[data.gameId].indexOf(ws);
        if (index !== -1) {
          clients[data.gameId].splice(index, 1);
        }
      }
    });
  });
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});

// server.on("upgrade", function upgrade(request, socket, head) {
//   wss.handleUpgrade(request, socket, head, function done(ws) {
//     wss.emit("connection", ws, request);
//   });
// });

// helper functions
function getNonTakenElement(gameState: GameState): string {
  const elements = ["Fire", "Water", "Earth", "Air"];
  const takenElements = gameState.players.map((p: Player) => p.element);
  const availableElements = elements.filter((e) => !takenElements.includes(e));
  return availableElements[0];
}

function startCountdown(gameId: string) {
  let countdown = 30;
  const countdownTimer = setInterval(() => {
    // Send the remaining time until the game starts to all clients
    countdown--;
    // console.log("countdown", countdown, gameId, clients);
    if (clients[gameId]) {
      clients[gameId].forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "countdown", result: countdown }));
        }
      });
    }
    // clear the interval if the countdown is less than 0
    if (countdown < 0) {
      clearInterval(countdownTimer);
    }
  }, 1000); // 1000 milliseconds = 1 second
}
