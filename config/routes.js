module.exports = (app, passport) => {
  const path = require('path');
  const usersPath = '/api/users';

  app.use(usersPath, require("./../server/routes/user")(app, passport, usersPath));

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

