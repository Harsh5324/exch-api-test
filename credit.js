const timestamp = require("unix-timestamp");

const credit = async (req, resp) => {
  try {
    resp.send({
      partnerKey:
        "lEOB6coQW4dCP15QXQwwAGYVtQCpEe09eHv36alfG4ykysWGZ1BLlBHBm9W77XmL",
      timestamp: Math.floor(timestamp.now()),
      userId: "mwin2",
      credit: 5000,
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
