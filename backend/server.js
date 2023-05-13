import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let clients = {};

wss.on("connection", function connection(ws) {
  if (Object.keys(clients).length > 1) {
    ws.close(1001, "full");
    return;
  }
  let player_index = Object.keys(clients).length;
  let username = `user-${Object.keys(clients).length + 1}`;

  const joined_game = { type: "joined_game", player_index };
  ws.send(JSON.stringify(joined_game));

  clients[username] = ws;
  console.log(`${username} connected.`);

  const player_joined = { type: "player_joined", players: Object.keys(clients) };
  broadcastMessage(player_joined);

  ws.on("message", function message(data) {
    broadcastMessage(JSON.parse(data));
  });

  ws.on("close", function close() {
    for (let client in clients) {
      if (clients[client] === ws) {
        // if first player left, replace first player with second player if second player exists
        if (client === "user-1" && "user-2" in clients) {
          let wsConn = clients["user-2"];
          clients = { "user-1": wsConn };

          // inform old user that it has rejoined
          wsConn.send(JSON.stringify({ type: "joined_game", player_index: 0 }));
        } else {
          delete clients[client];
        }

        broadcastMessage({ type: "player_left", players: Object.keys(clients) });
        break;
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
