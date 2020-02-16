module.exports = function (app, passport, url) {
  const express = require('express');
  const router = express.Router();
  const passportAuth = passport.authenticate.bind(passport);

  router.post('/', passportAuth("local-login", {
    successRedirect: url,
    failureRedirect: url,
    failureFlash : true
  }));


  router.get('/', (req, res) => {
    res.send({
      user: req.user || {},
      errorMessages: req.flash('error'),
      successMessages: req.flash('success'),
    });
  });

  return router;
};
