const db = require("./db");

const deleteData = async (_id, table) =>
  new Promise(async (resolve, reject) => {
    db.query(`delete from ${table} where _id = ${_id}`, (err) => {
      if (err) {
        reject({ status: "FAILURE" });
      } else {
        resolve({ status: "SUCCESS" });
      }
    });
  });

module.exports = deleteData;
