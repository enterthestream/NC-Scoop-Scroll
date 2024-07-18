exports.invalidArticleIdType = (err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "400 - Bad request" });
  } else {
    next(err);
  }
};

exports.customErrorHandler = (err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.usernameNotFound = (err, request, response, next) => {
  if (err.code === "23503") {
    const { username } = request.body;
    response.status(404).send({ msg: `404 - ${username} not found` });
  } else {
    next(err);
  }
};

exports.serverErrorHandler = (err, request, response, next) => {
  response.status(500).send({ msg: "Internal server error" });
};
