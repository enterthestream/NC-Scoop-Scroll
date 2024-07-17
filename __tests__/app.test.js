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
  });
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
