export default (err, req, res, next) => {
  console.log(err.message);

  let statusCode = err.statusCode || err.status || 500;
  let message = err.message;

  if (err.name === "ZodError") {
    statusCode = 400;
    message = err.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(", ");
  }

  console.log(statusCode);

  let error = "internal server error";
  if (statusCode === 404) {
    error = "Not found";
  } else if (statusCode === 400) {
    error = "Bad request";
  }

  res.status(statusCode).json({
    message: message,
    error: error, // bruger teksten fra if/else ovenfor, så 404 siger "Not found" og 400 siger "Bad request"
    statusCode: statusCode,
  });
};
