const express = require('express');

const { DBController } = require('./db-controller');

class ApiController {
    constructor() {
        this._app = express();
        this._db = new DBController();
        this._buildRoutes();
    }

    getApp() {
        return this._app;
    }

    async getArticles() {
        return await this._db.sendQuery('SELECT * FROM articles');
    }

    _buildRoutes() {
        this._app.post('/article', (req, res) => this._postArticle(req, res));
    }

    async _getArticles() {
        const articles = await this._db.sendQuery('SELECT * FROM articles');
        console.log(articles);
    }

    async _postArticle(req, res) {
        const { title, author } = req.body;

        if(!title || !author) {
            res.sendStatus(400);
        }
        
        await this._db.sendQuery(`INSERT INTO articles (
            id, title, author, likes, comments
        ) VALUES (
            0, "${title}", "${author}", 0, 0
        )`);

        res.sendStatus(200);
    }
}

module.exports = { ApiController };