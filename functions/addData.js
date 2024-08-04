const db = require("./db");

const addData = (data, table, q) =>
  new Promise(async (resolve, reject) => {
    let query = `INSERT INTO ${table} SET ?`;

    if (q) {
      query += ` WHERE ${q}`;
    }

    if (data._id) {
      const id = data._id;
      delete data._id;
      query = `UPDATE ${table} SET ? WHERE _id = ${id}`;
    }

    // Format datetime values
    for (const key in data) {
      if (
        Object.prototype.hasOwnProperty.call(data, key) &&
        typeof data[key] === "string" &&
        isISODateTimeString(data[key])
      ) {
        data[key] = new Date(data[key])
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
      }
    }

    db.query(query, data, (err, res) => {
      if (err) {
        console.error("Error executing query:", err);
        reject({ status: "FAILURE" });
      } else {
        if (!data._id) {
          resolve({
            status: "SUCCESS",
            data: { _id: res.insertId },
          });
        } else {
          resolve({ status: "SUCCESS" });
        }
      }
    });
  });

// Function to check if string is an ISO date time string
function isISODateTimeString(str) {
  const isoDateTimeRegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z?$/;
  return isoDateTimeRegex.test(str);
}

module.exports = addData;
