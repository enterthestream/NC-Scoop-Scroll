const db = require("../db/connection");

function selectArticles() {
  return db
    .query(
      `
    SELECT
      articles.title,
      articles.author,
      articles.article_id,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;
    `
    )
    .then(({ rows }) => {
      return rows;
    });
}

function selectArticleById(articleId) {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [articleId])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No article found under id ${articleId}`,
        });
      }
      return rows[0];
    });
}

module.exports = { selectArticleById, selectArticles };
