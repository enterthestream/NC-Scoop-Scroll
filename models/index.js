const {
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
  checkArticleExists,
  insertComment,
  updateArticleVotes,
  removeCommentById,
  checkCommentExists,
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
  removeCommentById,
  checkCommentExists,
};
