const { oddsMap } = require("../../functions/map");

const footballmarket = async (req, resp) => {
  try {
    const { matchId } = req.params;

    const allFootballMatches = oddsMap.get("allFootballMatches");

    if (!allFootballMatches.find((data) => data && data.event.id === matchId))
      return resp.fail("Match not found");

    const { data: footballMatchOds } = oddsMap.get("footballOds");

    const odds = footballMatchOds.filter(
      (data) => data && data.eventid === matchId
    );

    const scoreId = allFootballMatches.find(
      (data) => data && data.event.id === matchId
    ).scoreboard_id;

    const iframe = scoreId ? `https://lmt.ss8055.com/?Id=${scoreId}&t=d` : null;

    resp.suc({ odds, iframe });
  } catch (err) {
    // console.log("🚀 ~ file: footballmarket.js:26 ~ footballmarket ~ err:", err);
    resp.fail();
  }
};

module.exports = footballmarket;
