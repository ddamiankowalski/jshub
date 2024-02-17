const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

class SSRArticle {
    _pathPrefix = '../routes/views/';
    
    constructor() {
        this._path = path.join(__dirname, this._pathPrefix + 'articles.html');
    }

    async parse() {
        return await this._readFile();
    }

    async _readFile() {
        return await fsPromises.readFile(this._path, 'utf-8'); 
    }
}

module.exports = { SSRArticle };