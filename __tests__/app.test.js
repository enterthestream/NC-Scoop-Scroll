const app = require("../app");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const endpointsFile = require("../endpoints.json");

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
