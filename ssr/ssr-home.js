class SSRHome {
    constructor(pageFile) {
        this._pageFile = pageFile;
    }

    parse() {
        let decorator = this._getDecorator();

        while(decorator) {
            this._parseDecorator(decorator);
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

    _parseDecorator(decorator) {
        this._pageFile = this._pageFile.replaceAll(decorator.raw, this[decorator.name]());
    }

    valuePlaceholder() {
        return 'dupa';
    }

    getPostImage() {
        return `
            background: linear-gradient(to bottom, rgba(217, 217, 217, 0.125), rgba(0, 0, 0, 0.75)), url('assets/img/articles/1.png'); 
            background-size: cover; 
            background-position: center;`
    }
}

module.exports = { SSRHome };