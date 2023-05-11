import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const clients = {};

wss.on("connection", function connection(ws) {
  console.log(`Recieved a new connection.`);

  if (Object.keys(clients).length > 1) {
    console.log("only two players supported");
    // ws.close("loooooooooooooooooool");
    ws.close(1001, "full");
    return;
  }

  const userId = `user-${Object.keys(clients).length}`;
  // Store the new connection and handle messages
  ws.binaryType = "arraybuffer";
  clients[userId] = ws;
  console.log(`${userId} connected.`);
  const obj = { type: "set_me", me: userId };
  ws.send(JSON.stringify(obj));
  ws.on("message", function message(data) {
    console.log("received: ", data);
    broadcastMessage(data);
  });

  if (Object.keys(clients).length > 0) {
    // current player is 0;
    // me is 1
  } else {
    // current player is 1
    // me is 1
  }

  ws.on("close", function close(data) {
    console.log("Connection closed", data);
    console.log("Connection closed", ws);
    for (let client in clients) {
      if (clients[client] === ws) {
        console.log("Remove that client: ", client);
        delete clients[client];
      }
    }
  });
});

function broadcastMessage(json) {
  // const data = JSON.stringify(json);
  for (const client in clients) {
    // console.log("DATA: ", data);
    clients[client].send(json.toString());
  }
}
