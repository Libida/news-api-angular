const User = require("../models/user");

exports.login = (req, email, password, done) => {
    if (email)
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

    process.nextTick(function () {
        User.findOne({"local.email": email}, function (err, user) {
            if (err)
                return done(err, false, req.flash("error", "Something went wrong, please try again later."));

            if (!user)
                return done(null, false, req.flash("error", "No user found."));

            if (!user.validPassword(password))
                return done(null, false, req.flash("error", "Oops! Wrong password."));

            else
                return done(null, user);
        });
    });
};

exports.signup = (req, email, password, done) => {
    if (email)
        email = email.toLowerCase();

    process.nextTick(function () {
        if (!req.user) {
            User.findOne({"local.email": email}, function (err, user) {
                if (err)
                    return done(err);

                if (user) {
                    return done(null, false, req.flash("error", "This email is already taken."));
                } else {
                    const newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function (err) {
                        if (err)
                            return done(err);

                        return done(null, newUser);
                    });
                }

            });
        }
    });
};

exports.facebookAuth = (req, token, refreshToken, profile, done) => {
    // asynchronous
    process.nextTick(function () {

        // check if the user is already logged in
        if (!req.user) {

            User.findOne({"facebook.id": profile.id}, function (err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if there is a user id already but no token (user was linked at one point and then removed)
                    if (!user.facebook.token) {
                        user.facebook.token = token;
                        user.facebook.name = profile.name.givenName + " " + profile.name.familyName;
                        user.facebook.email = (profile.emails[0].value || "").toLowerCase();

                        user.save(function (err) {
                            if (err)
                                return done(err);

                            return done(null, user);
                        });
                    }

                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    const newUser = new User();

                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = profile.name.givenName + " " + profile.name.familyName;
                    newUser.facebook.email = (profile.emails[0].value || "").toLowerCase();

                    newUser.save(function (err) {
                        if (err)
                            return done(err);

                        return done(null, newUser);
                    });
                }
            });

        } else {
            // user already exists and is logged in, we have to link accounts
            const user = req.user; // pull the user out of the session

            user.facebook.id = profile.id;
            user.facebook.token = token;
            user.facebook.name = profile.name.givenName + " " + profile.name.familyName;
            user.facebook.email = (profile.emails[0].value || "").toLowerCase();

            user.save(function (err) {
                if (err)
                    return done(err);

                return done(null, user);
            });

        }
    });
};