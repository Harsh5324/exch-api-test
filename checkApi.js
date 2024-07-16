const { default: axios } = require("axios");

const checkApi = async (req, resp) => {
  try {
    let { data } = await axios.get("http://142.93.36.1/api/v2" + req.body.path);

    if (typeof data[0] === "string") {
      data = data.map((item) => JSON.parse(item));
    }

    resp.suc(data);
  } catch (err) {
    console.log("🚀 ~ file: checkApi.js:5 ~ checkApi ~ err:", err);
    resp.fail(err);
  }
};

module.exports = checkApi;
