import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {  console.log(socket.id); });
socket.on("disconnect", () => {  console.log(socket.id); });

socket.on("connect_error", () => {  setTimeout(() => {    socket.connect();  }, 1000);});
