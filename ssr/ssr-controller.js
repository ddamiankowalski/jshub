const fs = require('fs');
const { SSRViewFactory } = require('../ssr/ssr-view-factory');
const fsPromises = fs.promises;

class SSRController {
  constructor() {
    this.viewFactory = new SSRViewFactory();
  }

  async parsePage(path) {
    const page = await fsPromises.readFile(path, 'utf-8');
    const tagsObj = this._getAtTags(page);
    const valid = this._validateTagsStructure(tagsObj);

    return page;
  }

  _getAtTags(page) {
    return [...page.matchAll(/@\w+/g)].filter(match => this._isValidTag(match)).map(match => ({ tag: match[0], index: match.index }));
  }

  _isValidTag(match) {
    const [tag] = match;
    return ['@for', '@endfor', '@if', '@endif'].includes(tag);
  }

  _validateTagsStructure(tagsObj) {
    const result = [];

    tagsObj.forEach(obj => {
        const tag = obj.tag;
        const index = obj.index;

        if (this._isStartTag(tag)) {
            const view = this.viewFactory.create(tag);
            result.push(view);
        }

        if (this._isEndTag(tag)) {
            const lastViewEl = result[result.length - 1];
            if (lastViewEl.endTag !== tag) {
                throw new Error('Invalid tag structure');
            } else {
                result.pop();
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