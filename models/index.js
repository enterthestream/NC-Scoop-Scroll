const {
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
  checkArticleExists,
  insertComment,
  updateArticleVotes,
} = require("./articles.model");
const { selectTopics } = require("./topics.models");

module.exports = {
  selectTopics,
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
  checkArticleExists,
  insertComment,
  updateArticleVotes,
};
