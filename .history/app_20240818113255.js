const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
app.get("/", (request, response) => {
  response.send("Hello World");
});
app.listen(3000);
