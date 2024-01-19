const { SSRView } = require('./ssr-view');

class SSRForView extends SSRView {
    constructor() {
        super('@for', '@endfor');
        console.log(this);
    }
}

module.exports = { SSRForView };