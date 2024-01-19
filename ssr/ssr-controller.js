const fs = require('fs');
const { SSRViewFactory } = require('../ssr/ssr-view-factory');
const fsPromises = fs.promises;

class SSRController {
  constructor() {
    this.viewFactory = new SSRViewFactory();
  }

  async parsePage(path) {
    const page = await fsPromises.readFile(path, 'utf-8');
    const matches = this._getAtMatches(page);
    const valid = this._validateTagsStructure(matches);

    return page;
  }

  _getAtMatches(page) {
    return [...page.matchAll(/@\w+/g)].filter(match => this._isValidTag(match));
  }

  _isValidTag(match) {
    const [tag] = match;
    return ['@for', '@endfor', '@if', '@endif'].includes(tag);
  }

  _validateTagsStructure(matches) {
    const result = [];

    matches.forEach(match => {
        const { input, index } = match;
        const [tag] = match;

        if (this._isStartTag(tag)) {
            const view = this.viewFactory.create(tag, input, index);
            result.push(view);
        }

        if (this._isEndTag(tag)) {
            const lastViewEl = result[result.length - 1];
            if (lastViewEl.endTag !== tag) {
                throw new Error('Invalid tag structure');
            } else {
                const view = result.pop();
                view.buildContext(index);
            }
        }
    })

    return result.length === 0;
  }

  _isEndTag(tag) {
    return tag.slice(1, 4) === 'end';
  }

  _isStartTag(tag) {
    return tag.slice(1, 4) !== 'end';
  }
}

module.exports = { SSRController }