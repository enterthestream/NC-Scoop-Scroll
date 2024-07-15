const { response } = require("./app");

exports.serverErrorHandler = (err, request, response, next) => {
  response.status(500).send({ msg: "Internal server error" });
};
