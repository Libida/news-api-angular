const mongoose = require("mongoose");

const NewsArticleSchema = mongoose.Schema({
    "author": String,
    "title": String,
    "description": String,
    "content": String,
    "url": String,
    "urlToImage": String,
    "type": String,
    "publishedAt": String
}, {
    timestamps: true
});

module.exports = mongoose.model("NewsArticle", NewsArticleSchema);
