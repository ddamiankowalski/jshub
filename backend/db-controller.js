const mysql = require('mysql2/promise');

class DBController {
    async sendQuery(query) {
        const conenction = await this._createConnection();
        const [results, fields] = await connection.query(query);

        console.log(results, fields);
    }

    async _createConnection() {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'jshub'
        });
    }
}

module.exports = { DBController };