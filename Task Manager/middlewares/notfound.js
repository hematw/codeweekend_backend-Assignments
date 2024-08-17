const notfound = (req, res) => {
  res.json({
    status: 404,
    error: "Not Found",
    message:
      `The requested endpoint [${req.url}] was not found on this server.`
  });
};

module.exports = notfound;