import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const clients = {};

wss.on("connection", function connection(ws) {
  console.log(`Recieved a new connection.`);

  const userId = `user-${Object.keys(clients).length}`;
  // Store the new connection and handle messages
  clients[userId] = connection;
  console.log(`${userId} connected.`);
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
});
