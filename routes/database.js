const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

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
        return new Promise((res,rej) => {
            this.connection.end(err => {
                if (err) {
                    return rej(err);
                }
                res();
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