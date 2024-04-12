exports.errorHandler = (err, req, res, next) => {
  const message = err.message;
  const error = {
    status: "Error",
    error: message,
  };

  const status = err.status || 400;
  return res.status(status).json(error);

  // return res.status(status).json(error);
};
