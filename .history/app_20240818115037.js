const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
app.set("viewengine", "ejs");
app.set(express.static(path.join(__dirname, "public")));
io.on("connection", function (socket) {
  console.log(`Connected`);
});
app.get("/", (request, response) => {
  response.send("Hello World");
});
server.listen(3000);
