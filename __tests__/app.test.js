const app = require("../app");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");

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
          expect(endpoints).toEqual(endpoints);
        });
    });
  });
});

xdescribe("/api/articles/:article_id", () => {
  describe("GET", () => {
    test("responds with status 200 and an article object and specified properties", () => {
      return request(app)
        .get("/api/articles/5")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toMatchObject({
            title: "UNCOVERED: catspiracy to bring down democracy",
            topic: "cats",
            author: "rogersop",
            body: "Bastet walks amongst us, and the cats are taking arms!",
            created_at: 1596464040000,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
  });
});

describe("invalid enpoint", () => {
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
