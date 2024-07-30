const balance = async (req, resp) => {
  try {
    resp.send({
      partnerKey:
        "lEOB6coQW4dCP15QXQwwAGYVtQCpEe09eHv36alfG4ykysWGZ1BLlBHBm9W77XmL",
      timestamp: Date().now(),
      userId: 1,
      balance: 5000,
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
