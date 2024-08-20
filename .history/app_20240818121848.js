const express = require("express");
const app = express();
const http = require("http");

const socketio = require("socket.io");
const path = require("path");
const server = http.createServer(app);
const io = socketio(server);
/*
app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));
io.on("connection", function (socket) {
  console.log(`Connected`);
});
app.get("/", (request, response) => {
  response.render("index");
});
server.listen(3000);
*/
// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Handle socket connections
io.on("connection", (socket) => {
  socket.io;
  console.log("Connected");
});

// Render the index view
app.get("/", (request, response) => {
  response.render("index");
});

// Start the server
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
