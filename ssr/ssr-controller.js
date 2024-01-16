const fs = require('fs');
const { SSRViewFactory } = require('../ssr/ssr-view-factory');
const fsPromises = fs.promises;

class SSRController {
  constructor() {
    this.viewFactory = new SSRViewFactory();
  }

  async parsePage(path) {
    const page = await fsPromises.readFile(path, 'utf-8');
    const tags = this._getAtTags(page);
    const valid = this._validateTagsStructure(tags);

    return page;
  }

  _getAtTags(page) {
    let matches = page.match(/@\w+/g).filter(match => this._isValidTag(match));
    return matches;
  }

  _isValidTag(tag) {
    return ['@for', '@endfor', '@if', '@endif'].includes(tag);
  }

  _validateTagsStructure(tags) {
    const result = [];
    console.log(tags)
    tags.forEach(tag => {
      if (this._isStartTag(tag)) {
        const view = this.viewFactory.create();
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

  _getEndTag(tag) {
    return `@end${tag.slice(1)}`;
  }

  _isEndTag(tag) {
    return tag.slice(1, 4) === 'end';
  }

  _isStartTag(tag) {
    return tag.slice(1, 4) !== 'end';
  }
}

module.exports = { SSRController }