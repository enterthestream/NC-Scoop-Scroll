const express = require("express");
const {
  getEndpoints,
  getTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  postComment,
  patchArticleVotes,
  deleteCommentById,
  getUsers,
} = require("./controllers");
const {
  invalidArticleIdType,
  usernameNotFound,
  customErrorHandler,
} = require("./error-handlers");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.get("/api/users", getUsers);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticleVotes);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.use(invalidArticleIdType);
app.use(customErrorHandler);
app.use(usernameNotFound);

app.all("*", (request, response, next) => {
  response.status(404).send({ msg: "path not found" });
}); // response for an invalid enpoint

module.exports = app;
