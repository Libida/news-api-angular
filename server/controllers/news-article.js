const mongoose = require("mongoose");
const {createLogger, format, transports} = require("winston");
const {combine, timestamp, label, prettyPrint} = format;
const NewsArticle = require("../models/news-article");
const logger = createLogger({
    level: "info",
    format: combine(
        label({label: "News articles Rest API"}),
        timestamp(),
        prettyPrint()
    ),
    defaultMeta: {service: "user-service"},
    transports: [
        new transports.File({filename: "./logs/combined.log"})
    ]
});

exports.create = (req, res) => {
    validateNewsArticle({req, res});

    const newsArticle = new NewsArticle(populateNewsArticle({req}));

    newsArticle.save().then(data => {
            handleSuccess({req, res, txt: "Created", id: data._id})
        }
    ).catch(err => {
        catchNewsArticleError({req, res, err, txt: "creating"});
    });

    addLogging({req, res});
};

exports.findAll = (req, res) => {
    NewsArticle.find().then(newsArticles => {
        res.send(newsArticles);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occured white creating the News Article"
        });
    });

    addLogging({req, res});
};

exports.findOne = (req, res) => {
    NewsArticle.findById(req.body).then(newsArticle => {
        checkNewsArticle({req, res, newsArticle});
        res.send(newsArticle);
    }).catch(err => {
        catchNewsArticleError({req, res, err, txt: "retrieving"});
    });

    addLogging({req, res});
};

exports.update = (req, res) => {
    validateNewsArticle({req, res});

    NewsArticle.findByIdAndUpdate(req.body, populateNewsArticle({req}), {new: true})
        .then(newsArticle => {
            checkNewsArticle({req, res, newsArticle});
            res.send(newsArticle);
        }).catch(err => {
        catchNewsArticleError({req, res, err, txt: "updating"});
    });

    addLogging({req, res});
};

exports.delete = (req, res) => {
    const id = req.body.newsArticleId;
    const isValid = validateNewsArticleId({id, req, res});

    if (!isValid) return;

    NewsArticle.findByIdAndRemove(id)
        .then(newsArticle => {
            checkNewsArticle({req, res, newsArticle});
            handleSuccess({req, res, txt: "Deleted"})
        }).catch(err => {
        catchNewsArticleError({req, res, err, txt: "deleting"});
    });

    addLogging({req, res});
};

function validateNewsArticle(options = {}) {
    const {req = {}, res = {}} = options;
    const newsArticle = req.body;

    if (!newsArticle.title) {
        res.locals.errors = "News Article title should not be empty";
    }

    if (!newsArticle.description) {
        res.locals.errors = "News Article description should not be empty";
    }
}

function populateNewsArticle(options = {}) {
    const {req = {}} = options;
    const reqBody = req.body || {};

    return {
        "author": reqBody.author,
        "title": reqBody.title,
        "description": reqBody.description,
        "url": reqBody.url,
        "urlToImage": reqBody.urlToImage
    };
}

function getNewsArticleError404(options = {}) {
    const {req = {}, res = {}, id = req.body.newsArticleId} = options;

    req.flash("error", `News Article with id:${id} was not found`);
}

function checkNewsArticle(options = {}) {
    const {req = {}, res = {}, newsArticle} = options;

    if (!newsArticle) {
        getNewsArticleError404(options);
    }
}

function catchNewsArticleError(options = {}) {
    const {req = {}, res = {}, err = {}, txt = "", id = req.body.newsArticleId} = options;

    if (err.kind === "ObjectId" || err.name === "NotFound") {
        getNewsArticleError404(options);
    }
    else {
        req.flash("error", `Error ${txt} news article with id  id`);
    }
}

function handleSuccess(options = {}) {
    const {req = {}, res = {}, txt = "", id = req.body.newsArticleId} = options;

    req.flash("success", `${txt} news article with id:${id} successfully`);
    goToAdminPage(res);
}

function validateNewsArticleId(options = {}) {
    const {id, req, res} = options;
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
        req.flash("error", `News Article with id:${id} has invalid news article id`);
        goToAdminPage(res);
    }

    return isValid;
}

function goToAdminPage(res) {
    res.redirect("/profile");
}

function addLogging(options = {}) {
    const {req = {}, res = {}, level = "info"} = options;
    logger.log({
        level: level,
        message: req.url
    });
}
