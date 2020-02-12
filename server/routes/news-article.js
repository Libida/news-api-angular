module.exports = (app) => {
    const newsArticleController = require("../controllers/news-article");
    const urlBase = "/news-articles";
    const urlWithId = `${urlBase}/:newsArticleId`;

    app.post("/profile-add-news", newsArticleController.create);

    app.get(urlBase, newsArticleController.findAll);

    app.get(urlWithId, newsArticleController.findOne);

    app.put(urlWithId, newsArticleController.update);

    app.post("/profile-delete-news", newsArticleController.delete);

};