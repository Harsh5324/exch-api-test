const timestamp = require("unix-timestamp");

const debit = async (req, resp) => {
  try {
    resp.send({
      partnerKey:
        "lEOB6coQW4dCP15QXQwwAGYVtQCpEe09eHv36alfG4ykysWGZ1BLlBHBm9W77XmL",
      timestamp: Math.floor(timestamp.now()),
      userId: "mwin2",
      debit: 5000,
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
