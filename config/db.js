const mongoose = require("mongoose");

module.exports = (app, config, colors) => {
    const url = config.DB;

    mongoose.Promise = global.Promise;

    mongoose.connect(url, {
        useNewUrlParser: true
    }).then(() => {
        console.log(colors.successColor(`Successfully connected to the database on ${url}`));
    }).catch(err => {
        console.log(colors.errorColor(`Could not connect to the database on ${url}. Exiting now...`), err);
        process.exit();
    });

    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);


    //Helper to check if an ID is an object ID
    mongoose.isObjectId = function(id) {
        return (id instanceof ObjectId);
    };

    //Helper to validate a string as object ID
    mongoose.isValidObjectId = function(str) {
        if (typeof str !== 'string') {
            return false;
        }
        return str.match(/^[a-f\d]{24}$/i);
    };
};