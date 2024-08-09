const app = require("../app");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const endpointsFile = require("../endpoints.json");
const articles = require("../db/data/test-data/articles");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  return db.end();
});

describe("/api/topics", () => {
  describe("GET request", () => {
    test("responds with status 200 and an array of topic objects, each of which have properties of slug and description", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).toHaveLength(3);
          topics.forEach((topic) => {
            expect(topic).toEqual({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
        });
    });
  });
});
describe("/api", () => {
  describe("GET request", () => {
    test("responds with json representation of all the available endpoints of the api", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body: { endpoints } }) => {
          expect(endpoints).toEqual(endpointsFile);
        });
    });
  });
});

describe("/api/articles/:article_id", () => {
  describe("GET", () => {
    test("responds with status 200 and an article object and specified properties", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
    test("responds with a status 400 when given an invalid type for article_id", () => {
      return request(app)
        .get("/api/articles/not-a-number")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("400 - Bad request");
        });
    });
    test("responds with a status 404 not found, when given a valid article_id type that does not exist", () => {
      return request(app)
        .get("/api/articles/808")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("No article found under id 808");
        });
    });
  });
  describe("PATCH", () => {
    test("responds with a status 200 and updates article by article_id", () => {
      const patchObj = { inc_votes: 1 };
      return request(app)
        .patch("/api/articles/4")
        .send(patchObj)
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toEqual({
            article_id: 4,
            title: "Student SUES Mitch!",
            topic: "mitch",
            author: "rogersop",
            body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
            created_at: "2020-05-06T01:14:00.000Z",
            votes: 1,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
    test("responds with a status 400 when given an invalid type for article_id", () => {
      const patchObj = { inc_votes: 1 };
      return request(app)
        .patch("/api/articles/not-a-number")
        .send(patchObj)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("400 - Bad request");
        });
    });
    test("responds with a status 200 and updates article by article_id, when inc_votes is a string number", () => {
      const patchObj = { inc_votes: "1" };
      return request(app)
        .patch("/api/articles/4")
        .send(patchObj)
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toEqual({
            article_id: 4,
            title: "Student SUES Mitch!",
            topic: "mitch",
            author: "rogersop",
            body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
            created_at: "2020-05-06T01:14:00.000Z",
            votes: 1,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
    test("responds with a status 400 when given an invalid type(a word, not a string number) for inc_votes", () => {
      const patchObj = { inc_votes: "one" };
      return request(app)
        .patch("/api/articles/4")
        .send(patchObj)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("400 - Bad request");
        });
    });
    test("responds with a status 200 and updates article by article_id with negative votes", () => {
      const patchObj = { inc_votes: -10 };
      return request(app)
        .patch("/api/articles/1")
        .send(patchObj)
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 90,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
    test("responds with a status 404 not found, when given a valid article_id type that does not exist", () => {
      const patchObj = { inc_votes: 1 };
      return request(app)
        .patch("/api/articles/808")
        .send(patchObj)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("No article found under id 808");
        });
    });
    test("responds with a status 400 when given an invalid type for article_id", () => {
      const patchObj = { inc_votes: 1 };
      return request(app)
        .patch("/api/articles/not-a-number")
        .send(patchObj)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("400 - Bad request");
        });
    });
  });
});
describe("/api/articles", () => {
  describe("GET", () => {
    test("responds with a status 200 and an array of article objects with the specified properties", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).toHaveLength(13);
          articles.forEach((article) => {
            expect(article).toMatchObject({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(String),
            });
          });
        });
    });
    test("returns array of article objects ordered by date in descending order", () => {
      return request(app)
        .get("/api/articles")
        .then(({ body: { articles } }) => {
          expect(articles).toBeSortedBy("created_at", { descending: true });
        });
    });
    test("responds with a status 200 and articles order given by sort_by query column name, defaults to created_at descending", () => {
      return request(app)
        .get("/api/articles?sort_by=author")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).toHaveLength(13);
          expect(articles).toBeSortedBy("author", {
            descending: true,
          });
        });
    });
    test("responds with a status 400 and error message for invalid sort_by query value", () => {
      return request(app)
        .get("/api/articles?sort_by=not_a_valid_column")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid query");
        });
    });
  });

  test("responds with a status 200 and takes an order query, which can be set to asc or desc (defaulting to descending)", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order=asc")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toHaveLength(13);
        expect(articles).toBeSortedBy("title", {
          ascending: true,
        });
      });
  });
  test("responds with a status 400 and error message for invalid order query value", () => {
    return request(app)
      .get("/api/articles?order=not_a_valid_query_value")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid query");
      });
  });
  test("accepts a topic query, responds with a status 200 and an array of articles filtered by topic", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toHaveLength(12);
        articles.forEach((article) => {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: "mitch",
            author: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });
  test("responds with a status 400 and error message for invalid order query value", () => {
    return request(app)
      .get("/api/articles?topic=not_a_valid_topic")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid query, topic does not exist");
      });
  });
});

describe("/api/articles?topic", () => {
  describe("GET", () => {});
});

describe("/api/articles/:article_id/comments", () => {
  describe("GET", () => {
    test("responds with a status 200 and an array of comments for the given article_id, with the specified properties", () => {
      const articleId = 1;
      return request(app)
        .get(`/api/articles/${articleId}/comments`)
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).toHaveLength(11);
          comments.forEach((comment) => {
            expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              article_id: articleId,
            });
          });
        });
    });
    test("returns array of comments ordered by date in descending order (most recent comments first)", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .then(({ body: { comments } }) => {
          expect(comments).toBeSortedBy("created_at", { descending: true });
        });
    });
    test("responds with a status 400 when given an invalid type for article_id", () => {
      return request(app)
        .get("/api/articles/not-a-number/comments")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("400 - Bad request");
        });
    });
    test("responds with a status 404 not found, when given a valid article_id type that does not exist", () => {
      return request(app)
        .get("/api/articles/808/comments")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("No article found under id 808");
        });
    });
    test("responds with a status 200 and an empty array, when given a valid article_id that exists but has no comments", () => {
      return request(app)
        .get("/api/articles/7/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).toEqual([]);
        });
    });
  });
  describe("POST", () => {
    test("responds with a status 201 and newly posted comment", () => {
      const postObj = {
        username: "butter_bridge",
        body: "Mitch should definitely grow a handsome Dallas on his face, it would look glorious.",
      };
      const articleId = 12;
      return request(app)
        .post(`/api/articles/${articleId}/comments`)
        .send(postObj)
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(comment).toEqual({
            comment_id: 19,
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: "butter_bridge",
            body: "Mitch should definitely grow a handsome Dallas on his face, it would look glorious.",
            article_id: articleId,
          });
        });
    });
    test("responds with a status 404 not found when username does not exist", () => {
      const postObj = {
        username: "non-existent-user",
        body: "Mitch should not grow a handsome Dallas on his face, it would not look so glorious.",
      };
      const articleId = 12;
      return request(app)
        .post(`/api/articles/${articleId}/comments`)
        .send(postObj)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe(`404 - ${postObj.username} not found`);
        });
    });
    test("responds with a status 400 when given an invalid type for article_id", () => {
      const postObj = {
        username: "butter_bridge",
        body: "Mitch should definitely grow a handsome Dallas on his face, it would look glorious.",
      };
      return request(app)
        .post("/api/articles/not-a-number/comments")
        .send(postObj)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("400 - Bad request");
        });
    });
    test("responds with a status 404 not found, when given a valid article_id type that does not exist", () => {
      const postObj = {
        username: "butter_bridge",
        body: "Mitch should definitely grow a handsome Dallas on his face, it would look glorious.",
      };
      return request(app)
        .post("/api/articles/808/comments")
        .send(postObj)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("No article found under id 808");
        });
    });
  });
});

describe("/api/comments/:comment_id", () => {
  describe("DELETE", () => {
    test("respond with a status 204 and no content, deletes the given comment by comment_id", () => {
      return request(app)
        .delete("/api/comments/4")
        .expect(204)
        .then(async ({ body }) => {
          expect(body).toEqual({});
          // check if comment has been deleted
          const { rows } = await db.query(
            "SELECT * FROM comments WHERE comment_id = 4"
          );
          expect(rows.length).toBe(0);
        });
    });
    test("responds with a status 400 when given an invalid type for comment_id", () => {
      return request(app)
        .delete("/api/comments/not-a-number")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("400 - Bad request");
        });
    });
    test("responds with a status 404 not found, when given a valid comment_id type that does not exist", () => {
      return request(app)
        .delete("/api/comments/808")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("No comment found under id 808");
        });
    });
  });
});
describe("/api/users", () => {
  describe("GET", () => {
    test("responds with status 200 and returns an array of objects, each with the specified properties", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users).toHaveLength(4);
          users.forEach((user) => {
            expect(user).toMatchObject({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            });
          });
        });
    });
  });
});

describe("Invalid endpoint", () => {
  describe("GET request", () => {
    test("given an endpoint that does not exist, responds with a status 404 and error message", () => {
      return request(app)
        .get("/api/not-a-valid-endpoint")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual("path not found");
        });
    });
  });
});
