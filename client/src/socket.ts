import { io, Socket } from "socket.io-client";

let socket: Socket;

export function getSocket() {
  if (!socket) {
    // socket = io("http://localhost:5000");
    socket = io("https://tic-tac-toe-y5xh.onrender.com");
  }
  return socket;
}