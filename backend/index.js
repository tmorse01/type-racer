const express = require("express");
const WebSocket = require("ws");
const http = require("http");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// This object will track the games
let games = {};

// This object will track the game state
let gameState = {
  players: [],
  gameInProgress: false,
};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const { type, data } = JSON.parse(message);

    switch (type) {
      case "create":
        const gameId = uuidv4();
        games[gameId] = { players: [], gameInProgress: false };
        ws.send(JSON.stringify({ type: "created", data: { gameId } }));
        break;
      case "join":
        if (games[data.gameId]) {
          games[data.gameId].players.push({ name: data.name, score: 0 });
        }
        break;
      case "score":
        const player = gameState.players.find((p) => p.name === data.name);
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
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(gameState));
      }
    });
  });
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
