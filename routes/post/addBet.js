const addData = require("../../functions/addData");
const getData = require("../../functions/getData");
const { authenticate } = require("../../functions/token");

const addBet = async (req, resp) => {
  try {
    const user = await authenticate(req, resp);

    let {
      data: [{ balance }],
    } = await getData("balance", "users", `_id = ${user}`);

    balance = parseFloat(balance) - parseFloat(req.body.amount);

    if (balance < 0) return resp.fail("Insufficient Balance");

    await addData(
      {
        ...req.body,
        user,
        balance,
      },
      "bets"
    );

    await addData({ _id: user, balance }, "users");

    resp.suc();
  } catch (err) {
    console.log("🚀 ~ file: addBet.js:5 ~ addBet ~ err:", err);
    resp.fail();
  }
};

module.exports = addBet;
