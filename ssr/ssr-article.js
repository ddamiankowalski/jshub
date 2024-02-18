class SSRArticle {
  _article = null;

  constructor(pageFile, api, id) {
    this._pageFile = pageFile;
    this._api = api;
    this._id = id;
  }
  
  async parse() {
    this._article = await this._api.getArticle(this._id);
    let decorator = this._getDecorator();

    while(decorator) {
      await this._parseDecorator(decorator);
      decorator = this._getDecorator();
    }

    return this._pageFile;
  }

  _getDecorator() {
    const match = /@@(.)*@@/.exec(this._pageFile);

    if (!match) {
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

  getArticleTitle() {
    return this._article.title;
  }

  getArticleAuthor() {
    return this._article.author;
  }

  getArticleImage() {
    let styles = 'style="'
    styles += `background: linear-gradient(to bottom, rgba(217, 217, 217, 0.125), rgba(0, 0, 0, 0.75)), url('/assets/img/articles/1.png');`;
    styles += `background-size: cover;background-position: center;"`;
    
    return styles;
  }
}

module.exports = { SSRArticle };