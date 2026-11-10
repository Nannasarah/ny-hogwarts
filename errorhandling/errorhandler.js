export default (err, req, res, next) => {
  console.log(err.message);
  console.log(err.statusCode);

  let error = "internal server error";
  if (err.statusCode === 404) {
    error = "Not found";
  } else if (err.statusCode === 400) {
    error = "Bad request";
  }

  res.status(err.statusCode).json({
    message: err.message,
    error: "Internal server error",
    statusCode: err.statusCode,
  });
};
