const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const { invalidEndpoint } = require("./error-handlers");
const app = express();

app.get("/api/topics", getTopics);

app.all("*", (request, response, next) => {
  response.status(404).send({ msg: "path not found" });
}); // response for an invalid enpoint

module.exports = app;
