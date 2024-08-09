const { oddsMap } = require("../../functions/map");

const market = async (req, resp) => {
  try {
    const { matchId } = req.params;

    const allCricketMatches = oddsMap.get("allCricketMatches");

    if (!allCricketMatches.find((data) => data && data.event.id === matchId))
      return resp.fail("Match not found");

    const { data: cricketSessions } = oddsMap.get("cricketSessions");

    let sessions = cricketSessions.find(
      (data) => data && data.matchId === matchId
    );

    sessions = sessions ? sessions.sessions : sessions;

    const { data: cricketMatchOds } = oddsMap.get("cricketOds");

    const odds = cricketMatchOds.filter(
      (data) => data && data.eventid == matchId
    );

    const { data: cricketBookmakers } = oddsMap.get("cricketBookmakers");

    const bookmakers = cricketBookmakers.filter(
      (data) => data && data.evid == matchId
    );

    const scoreId = allCricketMatches.find(
      (data) => data && data.event.id == matchId
    ).scoreboard_id;

    const iframe = scoreId ? `https://lmt.ss8055.com/?Id=${scoreId}&t=d` : null;

    resp.suc({ sessions, odds, bookmakers, iframe });
  } catch (err) {
    // console.log("🚀 ~ file: market.js:26 ~ market ~ err:", err);
    resp.fail();
  }
};

module.exports = market;
