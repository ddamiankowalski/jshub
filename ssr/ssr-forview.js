const { SSRView } = require('./ssr-view');

class SSRForView extends SSRView {
    endIndex = null;

    constructor(input, index) {
        super('@for', '@endfor');

        this.startIndex = index;
        this.input = input;
    }

    buildContext(index) {
        this.endIndex = index;
        const template = this.input.slice(this.startIndex, this.endIndex);
        console.log(template);
    }
}

module.exports = { SSRForView };