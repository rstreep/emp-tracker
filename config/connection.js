const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'M9d7p6y27!',
    database: 'emp_db'
})

module.exports = db;