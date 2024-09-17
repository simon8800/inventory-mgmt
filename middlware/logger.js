const logger = (req, res, next) => {
  if (!req.path.includes("styles.css")) console.log(req.path);
  next();
};

module.exports = logger;
