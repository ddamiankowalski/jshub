const { SSRForView } = require('./ssr-forview');
const { SSRIfView } = require('./ssr-if-view');

class SSRViewFactory {
    create(tag, input, index) {
        switch (tag) {
            case '@for':
                return new SSRForView(input, index);
            case '@if':
                return new SSRIfView();
        }
    }
}

module.exports = { SSRViewFactory };