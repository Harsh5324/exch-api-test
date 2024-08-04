const timestamp = require("unix-timestamp");

const balance = async (req, resp) => {
  try {
    const { body } = req;

    let {
      data: [{ balance }],
    } = await getData("balance", "users", `_id = ${body.user.id}`);

    balance = parseFloat(balance);

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
    console.log("🚀 ~ file: balance.js:5 ~ balance ~ err:", err);
  }
};

module.exports = balance;
