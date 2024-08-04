const { default: axios } = require("axios");

const slider = async (req, resp) => {
  try {
    const {
      data: [{ categorydetail: data }],
    } = await axios.get("https://testing123213jkfdain.online/api/5/category");
    resp.suc(data);
  } catch (err) {
    console.log("��� ~ file: slider.js:5 ~ slider ~ err:", err);
    resp.fail();
  }
};

module.exports = slider;
