const getData = require("../../functions/getData");
const { generateToken } = require("../../functions/token");

const login = async (req, resp) => {
  try {
    const { username, password } = req.body;

    const {
      data: [user],
    } = await getData(
      null,
      "users",
      `username = '${username}' && password = '${password}'`
    );

    if (!user) return resp.fail("Invalid Username or Password");

    resp.suc({ token: generateToken(user) });
  } catch (err) {
    console.log("🚀 ~ file: login.js:5 ~ login ~ err:", err);
    resp.fail();
  }
};

module.exports = login;
