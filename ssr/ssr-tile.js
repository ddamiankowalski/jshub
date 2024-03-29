const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

class SSRTile {
    _pathPrefix = '../routes/views/';
    _pageFile = '';
    
    constructor(article) {
        this._article = article;
        this._path = path.join(__dirname, this._pathPrefix + 'articles.html');
    }

    async parse() {
        this._pageFile = await this._readFile();
        let decorator = this._getDecorator();

        while(decorator) {
            await this._parseDecorator(decorator);
            decorator = this._getDecorator();
        }

        return this._pageFile;
    }

    async _readFile() {
        return await fsPromises.readFile(this._path, 'utf-8'); 
    }

    _getDecorator() {
        const match = /@@(?!.*@.*@@).*@@/.exec(this._pageFile);

        if(!match) {
            return null;
        }
        
        const [raw] = match;
        const { index } = match;
        
        return { raw, name: raw.slice(2, -2).trim(), len: raw.length, index };
    }

    async _parseDecorator(decorator) {
        const decoratorFn = this[decorator.name];

        if (!decoratorFn) {
            console.log(decorator.name);
            throw new Error(decorator.name);
        }

        const text = await this[decorator.name]();
        this._pageFile = this._pageFile.replaceAll(decorator.raw, text);
    }

    getLikes() {
        return this._article.likes;
    }

    getComments() {
        return this._article.comments;
    }

    getTitle() {
        return this._article.title;
    }

    getTileStyles() {
        let styles = 'style="'
        styles += `background: linear-gradient(to bottom, rgba(217, 217, 217, 0.125), rgba(0, 0, 0, 0.75)), url('/assets/img/articles/1.png');`;
        styles += `background-size: cover;background-position: center;"`;
    
        return styles;
    }

    getTileId() {
        return this._article.id;
    }
}

module.exports = { SSRTile };