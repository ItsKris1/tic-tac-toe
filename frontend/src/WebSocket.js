import useWebSocket from "react-use-websocket";
const WS_URL = "ws://127.0.0.1:8080";
export default function WebSocket() {
  const { sendMessage } = useWebSocket(WS_URL, {
    share: true,
    onOpen: () => {
      console.log("WebSocket connection established.");
    },

    onMessage: (e) => {
      console.log("CLIENT: Received message: ", e.data);
    },
  });
  return <button onClick={() => sendMessage("hello from client")}>Click Me</button>;
}
