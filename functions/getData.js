const db = require("./db");

const getData = (data, table, q, page, numOfItem, orderBy, isAnc) =>
  new Promise(async (resolve, reject) => {
    let query = `select ${data || "*"} from ${table}`;

    if (q) query += ` where ${q}`;

    if (page && numOfItem && orderBy)
      query += ` order by ${orderBy} ${
        isAnc ? "asc" : "desc"
      } limit ${numOfItem} offset ${(page - 1) * numOfItem}`;

    if (!page && !numOfItem && orderBy) {
      query += ` order by ${orderBy} desc`;
    }

    db.query(query, (err, res) => {
      if (err) {
        console.log("🚀 ~ file: getData.js:13 ~ db.query ~ err:", err);
        return reject({ status: "FAILURE" });
      } else {
        return resolve({ status: "SUCCESS", data: res });
      }
    });
  });

module.exports = getData;
