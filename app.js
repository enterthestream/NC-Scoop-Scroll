const express = require("express");
const {
  getEndpoints,
  getTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  postComment,
  patchArticleVotes,
} = require("./controllers");
const {
  invalidArticleIdType,
  articleIdNotFound,
  usernameNotFound,
} = require("./error-handlers");
const app = express();

app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticleVotes);

app.use(invalidArticleIdType);
app.use(articleIdNotFound);
app.use(usernameNotFound);

app.all("*", (request, response, next) => {
  response.status(404).send({ msg: "path not found" });
}); // response for an invalid enpoint

module.exports = app;
