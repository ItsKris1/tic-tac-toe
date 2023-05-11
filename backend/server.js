import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const clients = {};

wss.on("connection", function connection(ws) {
  if (Object.keys(clients).length > 1) {
    ws.close(1001, "full");
    return;
  }

  const userId = `user-${Object.keys(clients).length}`;
  clients[userId] = ws;
  console.log(`${userId} connected.`);

  const obj = { type: "player_joined", players: Object.keys(clients) };
  broadcastMessage(obj);

  ws.on("message", function message(data) {
    broadcastMessage(JSON.parse(data));
    // console.log("received: ", data);
  });

  ws.on("close", function close(data) {
    for (let client in clients) {
      if (clients[client] === ws) {
        delete clients[client];
        broadcastMessage({ type: "player_left", players: Object.keys(clients) });
      }
    }
  });
});

function broadcastMessage(json) {
  const data = JSON.stringify(json);
  for (const client in clients) {
    clients[client].send(data);
  }
}
