const { oddsMap } = require("../../functions/map");

const marketId = async (req, resp) => {
  try {
    const { eventId } = req.params;

    const allMatches = oddsMap.get("allCricketMatches");

    const { marketId } = allMatches.find(({ event: { id } }) => id === eventId);

    resp.suc({ marketId });
  } catch (err) {
    console.log("🚀 ~ file: marketId.js:5 ~ marketId ~ err:", err);
    resp.fail();
  }
};

module.exports = marketId;
