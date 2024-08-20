const express = require("express");
const app = express();
const http = require("http");

const socketio = require("socket.io");
const path = require("path");
const server = http.createServer(app);
const io = socketio(server);
app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));
io.on("connection", function (socket) {
  console.log(`Connected`);
});
app.get("/", (request, response) => {
  response.render("index");
});
server.listen(3000);
