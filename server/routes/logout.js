module.exports = function (app) {
  app.get("/api/logout", function (req, res) {
    req.logout();
    res.send({
      user: req.user || {},
      errorMessages: req.flash('error'),
      successMessages: req.flash('success'),
    });
  });
};
