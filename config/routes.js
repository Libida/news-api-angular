module.exports = (app, passport) => {
  const registerPath = '/api/register';
  const loginPath = '/api/login';

  app.use(registerPath, require("../server/routes/register")(app, passport, registerPath));
  app.use(loginPath, require("../server/routes/login")(app, passport, loginPath));

  require("./../server/routes/news-article")(app);
  // require("./../server/routes/user")(app, passport);
  // app.use('/api/users', require("./../server/routes/user")(app, passport));


    // app.get("/*", function(req,res,next){
    //     res.locals.errors = req.flash("error");
    //     res.locals.successMsgs = req.flash("success");
    //     res.locals.user = req.user;
    //     next();
    // });
    //
    // require("./../server/routes/news-article")(app);
    //
};

