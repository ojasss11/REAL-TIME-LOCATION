const express = require("express");
const app = express();
app.length("/", (request, response) => {
  response.send("Hello World");
});
