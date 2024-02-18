const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const { SSRHome } = require('./ssr-home');

class SSRController {
  _pathPrefix = '../routes/pages/';

  constructor(api) {
    this._api = api;
  }

  async parsePage(pageName) {
    const pagePath = this._getPagePath(pageName);
    const pageFile = await fsPromises.readFile(pagePath, 'utf-8'); 

    return await this._parsePage(pageFile, pageName);
  }

  _getPagePath(pageName) {
    switch(pageName) {
      case 'home': 
        return path.join(__dirname, this._pathPrefix + 'home.html');
    }
  }

  async _parsePage(pageFile, pageName) {
    let ssr;

    switch(pageName) {
      case 'home':
        ssr = new SSRHome(pageFile, this._api);
        return await ssr.parse();
    }
  }
}

module.exports = { SSRController };