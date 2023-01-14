const mysql2 = require("mysql2")
console.log("Connection in Mysql server file");
const con = mysql2.createConnection({

    host: "localhost",
    user: "root",
    password: "root123",
    database: "player",
    port: 3306,
    multipleStatements: true
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connection created..!!");
});

module.exports.con = con;