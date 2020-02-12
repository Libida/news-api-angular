const mongoose = require("mongoose");

const NewsArticleSchema = mongoose.Schema({
    "author": String,
    "title": String,
    "description": String,
    "url": String,
    "urlToImage": String
}, {
    timestamps: true
});

module.exports = mongoose.model("NewsArticle", NewsArticleSchema);