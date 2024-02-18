const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const { SSRHome } = require('./ssr-home');
const { SSRArticle } = require('./ssr-article');

class SSRController {
  _pathPrefix = '../routes/pages/';

  constructor(api) {
    this._api = api;
  }

  async parsePage(pageName, req, res) {
    const pagePath = this._getPagePath(pageName);
    const pageFile = await fsPromises.readFile(pagePath, 'utf-8'); 

    return await this._parsePage(pageFile, pageName, req, res);
  }

  _getPagePath(pageName) {
    switch(pageName) {
      case 'home': 
        return path.join(__dirname, this._pathPrefix + 'home.html');
      case 'article':
        return path.join(__dirname, this._pathPrefix + 'article.html');
      default:
        return null;
    }
  }

  async _parsePage(pageFile, pageName, req, res) {
    switch(pageName) {
      case 'home':
        return this._parseHomePage(pageFile);
      case 'article':
        return this._parseArticlePage(pageFile, req, res);
        
    }
  }

  async _parseHomePage(pageFile) {
    return await new SSRHome(pageFile, this._api).parse();
  }

  async _parseArticlePage(pageFile, req, res) {
    const { id } = req.query;

    if (!id) {
      res.redirect('/');
      return;
    }

    return await new SSRArticle(pageFile, this._api, id).parse();
  }
}

module.exports = { SSRController };