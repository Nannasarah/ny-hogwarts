export default (err, req, res, next) => {
  console.log(err.message);

  // Almindelige fejl (fx TypeError) har ingen statusCode, så de bliver til 500
  const statusCode = err.statusCode || err.status || 500;
  console.log(statusCode);

  let error = "internal server error";
  if (statusCode === 404) {
    error = "Not found";
  } else if (statusCode === 400) {
    error = "Bad request";
  }

  res.status(statusCode).json({
    message: err.message,
    error: "Internal server error",
    statusCode: statusCode,
  });
};
