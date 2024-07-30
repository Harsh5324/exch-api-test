const { default: axios } = require("axios");

const casinoApi = async (req, resp) => {
  try {
    let { data } = await axios.post(req.body.path, req.body.data);

    resp.suc(data);
  } catch (err) {
    console.log("🚀 ~ file: casinoApi.js:5 ~ casinoApi ~ err:", err);
    resp.fail(err);
  }
};

module.exports = casinoApi;
