const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const { getEndpoints } = require("./controllers/api.controllers");
const app = express();

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.all("*", (request, response, next) => {
  response.status(404).send({ msg: "path not found" });
}); // response for an invalid enpoint

module.exports = app;
