const {
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
  checkArticleExists,
} = require("./articles.model");
const { selectTopics } = require("./topics.models");

module.exports = {
  selectTopics,
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
  checkArticleExists,
};
