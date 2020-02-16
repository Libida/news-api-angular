module.exports = (app) => {
    const newsArticleController = require("../controllers/news-article");
    const urlBase = "/api/news-articles";
    const urlWithId = `${urlBase}/:newsArticleId`;

    app.post(`${urlBase}/add`, newsArticleController.create);

    app.get(urlBase, newsArticleController.findAll);

    app.get(urlWithId, newsArticleController.findOne);

    app.put(urlWithId, newsArticleController.update);

    app.delete(`${urlBase}/delete/`, newsArticleController.delete);

};
