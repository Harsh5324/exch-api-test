const api = require("../../functions/api");

const sports = async (req, resp) => {
  try {
    const data = await api.get("/sports/eventtypes");
    resp.suc(data);
  } catch (err) {
    console.log("🚀 ~ file: sports.js:5 ~ sports ~ err:", err);
    resp.fail();
  }
};

module.exports = sports;
