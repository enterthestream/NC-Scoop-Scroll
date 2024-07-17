const express = require("express");
const {
  getEndpoints,
  getTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
} = require("./controllers");
const { invalidArticleIdType, articleIdNotFound } = require("./error-handlers");
const app = express();

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.use(invalidArticleIdType);
app.use(articleIdNotFound);

app.all("*", (request, response, next) => {
  response.status(404).send({ msg: "path not found" });
}); // response for an invalid enpoint

module.exports = app;
