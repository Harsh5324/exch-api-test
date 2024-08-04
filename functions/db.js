const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "magicwin",
// });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Check@5324",
  database: "magicwin",
  socketPath: "/var/run/mysqld/mysqld.sock",
});

module.exports = db;
