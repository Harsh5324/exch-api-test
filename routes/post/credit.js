const timestamp = require("unix-timestamp");

const getData = require("../../functions/getData");
const addData = require("../../functions/addData");

const credit = async (req, resp) => {
  try {
    const { body } = req;

    let {
      data: [{ balance }],
    } = await getData("balance", "users", `_id = ${body.user.id}`);

    balance = parseFloat(balance) + parseFloat(body.transactionData.amount);

    await addData({ balance, _id: body.user.id }, "users");

    resp.send({
      partnerKey:
        "lEOB6coQW4dCP15QXQwwAGYVtQCpEe09eHv36alfG4ykysWGZ1BLlBHBm9W77XmL",
      timestamp: Math.floor(timestamp.now()).toString(),
      userId: body.user.id,
      balance,
      status: {
        code: "SUCCESS",
        message: "",
      },
    });
  } catch (err) {
    console.log("🚀 ~ file: credit.js:5 ~ credit ~ err:", err);
  }
};

module.exports = credit;
