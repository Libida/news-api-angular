module.exports = function (app, passport, usersPath) {
  const express = require('express');
  const router = express.Router();
  const passportAuth = passport.authenticate.bind(passport);

  // app.post("/login", passportAuth("local-login", {
  //     successRedirect: "/profile", // redirect to the secure profile section
  //     failureRedirect: "/login", // redirect back to the signup page if there is an error
  //     failureFlash: true // allow flash messages
  // }));
  //
  // app.get("/signup", function (req, res) {
  //     deprecateForLoggedUser(req, res, "signup");
  // });
  //

  router.post('/', passport.authenticate("local-signup", {
    successRedirect: usersPath,
    failureRedirect: usersPath,
    failureFlash : true
  }));


  router.get('/', (req, res) => {
    res.send({
      user: req.user || {},
      errorMessages: req.flash('error'),
      successMessages: req.flash('success'),
    });
  });


  // app.post('/users', passport.authenticate("local-signup", {failureFlash: true}));

  // app.get("/profile", isLoggedIn, function (req, res) {
  //     res.locals.user = req.user;
  //     res.render("profile.pug");
  // });
  //
  // app.get("/profile-add-news", isLoggedIn, function (req, res) {
  //     res.locals.user = req.user;
  //     res.render("profile-add-news.pug");
  // });
  //
  // app.get("/profile-delete-news", isLoggedIn, function (req, res) {
  //     res.locals.user = req.user;
  //     res.render("profile-delete-news.pug");
  // });
  //
  // app.get("/logout", function (req, res) {
  //     req.logout();
  //     res.redirect("/");
  // });
  //
  // // send to facebook to do the authentication
  // app.get("/connect/facebook", passport.authenticate("facebook", {scope: ["public_profile", "email"]}));
  //
  // // handle the callback after facebook has authorized the user
  // app.get("/connect/facebook/callback",
  //     passport.authenticate("facebook", {
  //         successRedirect: "/profile",
  //         failureRedirect: "/"
  //     })
  // );
  return router;
};

function deprecateForLoggedUser(req, res, page) {
  // if (!req.isAuthenticated()) {
  //     res.render(`${page}.pug`);
  // }
  // else {
  //     res.redirect("/profile");
  // }

  // if user is not authenticated in the session, carry on
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
}

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if he doesn't - redirect them to the start page
  res.redirect("/");
}
