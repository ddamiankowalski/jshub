const mysql = require('mysql2/promise');

class DBController {
    async sendQuery(query) {
        const connection = await this._createConnection();
        const [results, fields] = await connection.query(query);

        console.log(results, fields);
    }

    async _createConnection() {
        return await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'jshub',
            password: 't4jn3h4slo',
            database: 'jshub'
        });
    }
}

module.exports = { DBController };