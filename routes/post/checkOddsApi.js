const { default: axios } = require("axios");

const checkOddsApi = async (req, resp) => {
  try {
    let { data } = await axios.get("http://84.8.153.51/api/v2" + req.body.path);

    if (typeof data[0] === "string") {
      data = data.map((item) => JSON.parse(item));
    }

    resp.suc(data);
  } catch (err) {
    console.log("🚀 ~ file: checkOddsApi.js:5 ~ checkOddsApi ~ err:", err);
    resp.fail(err);
  }
};

module.exports = checkOddsApi;
