const { default: axios } = require("axios");

const checkApi = async (req, resp) => {
  try {
    let { data } = await axios.get("http://142.93.36.1/api/v2" + req.body.path);

    data = typeof data[0] === "string" ? JSON.parse(data[0]) : data;

    resp.send(data);
  } catch (err) {
    console.log("🚀 ~ file: checkApi.js:5 ~ checkApi ~ err:", err);
    resp.send(err);
  }
};

module.exports = checkApi;
