const { SSRForView } = require('./ssr-forview');
const { SSRIfView } = require('./ssr-if-view');

class SSRViewFactory {
    create(tag) {
        switch (tag) {
            case '@for':
                return new SSRForView(tag);
            case '@if':
                return new SSRIfView(tag);
        }
    }
}

module.exports = { SSRViewFactory };