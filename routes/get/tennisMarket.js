const { oddsMap } = require("../../functions/map");

const tennisMarket = async (req, resp) => {
  try {
    const { matchId } = req.params;

    const allTennisMatches = oddsMap.get("allTennisMatches");

    if (!allTennisMatches.find((data) => data && data.event.id === matchId))
      return resp.fail("Match not found");

    const { data: tennisMatchOds } = oddsMap.get("tennisOds");

    const odds = tennisMatchOds.filter(
      (data) => data && data.eventid === matchId
    );

    const scoreId = allTennisMatches.find(
      (data) => data && data.event.id === matchId
    ).scoreboard_id;

    const iframe = scoreId ? `https://lmt.ss8055.com/?Id=${scoreId}&t=d` : null;

    resp.suc({ odds, iframe });
  } catch (err) {
    console.log("🚀 ~ file: tennisMarket.js:26 ~ tennisMarket ~ err:", err);
    resp.fail();
  }
};

module.exports = tennisMarket;
