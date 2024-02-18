const { SSRArticle } = require('./ssr-article');

class SSRHome {
    constructor(pageFile, api) {
        this._api = api;
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
        const articles = await this._api.getArticles();

        for(let i = 0; i < articles.length; i++) {
            const ssr = new SSRArticle(articles[i].title);
            result += await ssr.parse();
        }

        return result;
    }
}

module.exports = { SSRHome };