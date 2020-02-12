module.exports = (app, passport) => {
    app.get("/*", function(req,res,next){
        res.locals.errors = req.flash("error");
        res.locals.successMsgs = req.flash("success");
        res.locals.user = req.user;
        next();
    });

    require("./../server/routes/news-article")(app);
    require("./../server/routes/user")(app, passport);
};

