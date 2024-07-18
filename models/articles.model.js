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
      return rows[0];
    });
}

function checkArticleExists(articleId) {
  return db
    .query(
      `
      SELECT article_id FROM articles
      WHERE article_id =$1
      `,
      [articleId]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No article found under id ${articleId}`,
        });
      }
    });
}

function selectCommentsByArticleId(articleId) {
  return db
    .query(
      `
      SELECT
        comments.comment_id,
        comments.votes,
        comments.created_at,
        comments.author,
        comments.body,
        comments.article_id
      FROM comments
      LEFT JOIN articles ON comments.article_id = articles.article_id
      WHERE articles.article_id = $1
      ORDER BY comments.created_at DESC
      `,
      [articleId]
    )
    .then(({ rows }) => {
      return rows;
    });
}

function insertComment(articleId, author, body) {
  return db
    .query(
      `
      INSERT INTO comments (article_id, author, body)
      SELECT $1, $2, $3
      FROM articles
      WHERE articles.article_id = $1
      RETURNING *
      `,
      [articleId, author, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

function updateArticleVotes(articleId, incVotes) {
  return db
    .query(
      `
      UPDATE articles
      SET votes = votes + $2
      WHERE article_id = $1
      RETURNING *
      `,
      [articleId, incVotes]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

function removeCommentById(commentId) {
  return db.query(
    `
      DELETE FROM comments
      WHERE comment_id = $1
      `,
    [commentId]
  );
}

function checkCommentExists(commentId) {
  return db
    .query(
      `SELECT comment_id FROM comments
    WHERE comment_id = $1`,
      [commentId]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No comment found under id ${commentId}`,
        });
      }
    });
}
module.exports = {
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
  checkArticleExists,
  insertComment,
  updateArticleVotes,
  removeCommentById,
  checkCommentExists,
};
