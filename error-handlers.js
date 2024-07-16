exports.invalidArticleIdType = (err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "400 - Bad request" });
  } else {
    next(err);
  }
};

exports.articleIdNotFound = (err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.serverErrorHandler = (err, request, response, next) => {
  response.status(500).send({ msg: "Internal server error" });
};
