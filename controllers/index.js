const { getEndpoints } = require("./api.controllers");
const {
  getArticleById,
  getArticles,
  getCommentsByArticleId,
} = require("./articles.controllers");
const { getTopics } = require("./topics.controllers");

module.exports = {
  getEndpoints,
  getTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
};
