const timestamp = require("unix-timestamp");

const getData = require("../../functions/getData");
const addData = require("../../functions/addData");

const debit = async (req, resp) => {
  try {
    const { body } = req;

    let {
      data: [{ balance }],
    } = await getData("balance", "users", `_id = ${body.user.id}`);

    console.log(body.body.gameData.description);

    balance =
      body.gameData.description === "cancel"
        ? parseFloat(balance) + parseFloat(body.transactionData.amount)
        : parseFloat(balance) - parseFloat(body.transactionData.amount);

    if (balance < 0)
      return resp.send({
        partnerKey: null,
        timestamp: null,
        userId: null,
        balance: 0,
        status: {
          code: "INSUFFICIENT_BALANCE",
          message: "Inufficient balance",
        },
      });

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
    console.log("🚀 ~ file: debit.js:5 ~ debit ~ err:", err);
  }
};

module.exports = debit;
