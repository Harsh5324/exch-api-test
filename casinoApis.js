const { default: axios } = require("axios");

const checkApi = async (req, resp) => {
  try {
    let { data } = await axios.post(req.body.path, req.body.data);

    resp.suc(data);
  } catch (err) {
    console.log("🚀 ~ file: checkApi.js:5 ~ checkApi ~ err:", err);
    resp.fail(err);
  }
};

module.exports = checkApi;
