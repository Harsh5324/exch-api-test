const { default: axios } = require("axios");

const checkWcoApi = async (req, resp) => {
  try {
    let { data } = await axios.post(req.body.path, req.body.data);

    resp.suc(data);
  } catch (err) {
    console.log("🚀 ~ file: checkWcoApi.js:5 ~ checkWcoApi ~ err:", err);
    resp.fail(err);
  }
};

module.exports = checkWcoApi;
