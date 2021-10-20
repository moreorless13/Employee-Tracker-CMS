const mysql = require('mysql2');
class Database {
    constructor(config){
        this.connection = mysql.createConnection(config);
    }

    query(sql, args) {
        return new Promise((res, rej) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) {
                    console.log(err.sql);
                    console.log("");
                    return rej(err);
                }
                res(rows); 
            });
        });
    }

    close(){
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

// const db = mysql.createConnection(
//     {
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         database: 'company_db'
//     },
//     console.log(`Connected to the database.`)
// );

module.exports = Database;