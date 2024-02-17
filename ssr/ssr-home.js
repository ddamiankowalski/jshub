const { SSRArticle } = require('./ssr-article');

class SSRHome {
    constructor(pageFile) {
        this._pageFile = pageFile;
    }

    async parse() {
        let decorator = this._getDecorator();

        while(decorator) {
            await this._parseDecorator(decorator);
            decorator = this._getDecorator();
        }

        return this._pageFile;
    }

    _getDecorator() {
        const match = /@@(.)*@@/.exec(this._pageFile);

        if(!match) {
            return null;
        }
        
        const [raw] = match;
        const { index } = match;
        
        return { raw, name: raw.slice(2, -2).trim(), len: raw.length, index };
    }

    async _parseDecorator(decorator) {
        const text = await this[decorator.name]();
        this._pageFile = this._pageFile.replaceAll(decorator.raw, text);
    }

    async renderArticles() {
        let result = '';

        for(let i = 0; i < 60; i++) {
            const ssr = new SSRArticle('What is ECMAScript? A closer look at Promise object and the way it works');
            result += await ssr.parse();
        }

        return result;
    }

    valuePlaceholder() {
        return 'dupa';
    }
}

module.exports = { SSRHome };