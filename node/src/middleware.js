function apiLogger(req, res, next) {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
}

function errorLogger(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
}

function authenticate(req, res, next) {}

module.exports = {
  apiLogger,
  errorLogger,
  authenticate,
};
