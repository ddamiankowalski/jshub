const { DBController } = require('./db-controller');

class ResourceController {
    constructor() {
        this._db = new DBController();
        this._db.sendQuery('SHOW TABLES');
    }
}

module.exports = { ResourceController };