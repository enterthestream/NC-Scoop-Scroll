const { selectArticleById, selectArticles } = require("./articles.model");
const { selectTopics } = require("./topics.models");

module.exports = { selectTopics, selectArticleById, selectArticles };
