const { default: axios } = require("axios");
const nodeCron = require("node-cron");

const { oddsMap } = require("./map");

const timing = {
  tournaments: 60,
  odds: 10,
  bookmakers: 10,
};

Object.keys(timing).forEach((item) => {
  timing[item] = timing[item] * 1000;
});

const getOdds = async () => {
  try {
    const baseURL = "http://84.8.153.51/api/v2";

    const callApi = (path) =>
      new Promise(async (resolve, reject) => {
        try {
          // const { data, msg } = await axios.post(baseURL, { path });
          const { data } = await axios.get(baseURL + path);

          if (typeof data[0] === "string")
            data = data.map((item) => JSON.parse(item));

          resolve(data);
        } catch (err) {
          reject("Something went wrong");
        }
      });

    const cricket = async () => {
      const currentTime = new Date();

      const cricketTournaments = oddsMap.get("cricketTournaments");
      const allCricketMatches = oddsMap.get("allCricketMatches");
      const cricketMatchOds = oddsMap.get("cricketOds");
      const cricketMatchBookmakers = oddsMap.get("cricketBookmakers");

      // -------------------- update tournaments -------------------------
      if (
        !cricketTournaments ||
        currentTime.getTime() - cricketTournaments.updatedAt.getTime() >
          timing.tournaments
      ) {
        const tournaments = await callApi(
          "/fetch_data?Action=listCompetitions&EventTypeID=4"
        );

        oddsMap.set("cricketTournaments", {
          data: tournaments,
          updatedAt: currentTime,
        });

        const allMatches = [];

        await Promise.all(
          tournaments.map(async (t, tI) => {
            try {
              const matches = await callApi(
                `/fetch_data?Action=listEvents&EventTypeID=4&CompetitionID=${t.competition.id}`
              );
              matches.forEach((m) => allMatches.push(m));
              tournaments[tI] = { ...t, matches };
            } catch (err) {
              console.log(
                "🚀 ~ file: getOdds.js:52 ~ tournaments.map ~ err:",
                err
              );
            }
          })
        );

        oddsMap.set("cricketTournaments", {
          data: tournaments,
          updatedAt: currentTime,
        });

        await Promise.all(
          allMatches.map(async (m, mI) => {
            try {
              const [{ marketId }] = await callApi(
                `/getMarkets?EventTypeID=4&EventID=${m.event.id}`
              );
              allMatches[mI].marketId = marketId;
            } catch (err) {
              console.log(
                "🚀 ~ file: getOdds.js:73 ~ allMatches.map ~ err:",
                err
              );
            }
          })
        );

        oddsMap.set("allCricketMatches", allMatches);
      }
      // ------------------- update tournaments end ----------------------

      // ------------------ get match ods -----------------------
      if (
        (!cricketMatchOds ||
          currentTime.getTime() - cricketMatchOds.updatedAt.getTime() >
            timing.odds) &&
        allCricketMatches
      ) {
        const matchesOds = [];

        await Promise.all(
          allCricketMatches.map(async (m, mI) => {
            try {
              const [odds] = await callApi(
                `/getMarketsOdds?EventTypeID=4&marketId=${m.marketId}`
              );
              matchesOds[mI] = odds;
            } catch (err) {}
          })
        );

        oddsMap.set("cricketOds", { data: matchesOds, updatedAt: currentTime });
      }
      // ------------------ get match ods end -------------------

      // ------------------ get match bookmakers -----------------------
      if (
        (!cricketMatchBookmakers ||
          currentTime.getTime() - cricketMatchBookmakers.updatedAt.getTime() >
            timing.bookmakers) &&
        allCricketMatches
      ) {
        let bookmakers = [];

        await Promise.all(
          allCricketMatches.map(async (m, mI) => {
            try {
              const odds = await callApi(
                `/getBookmakers?EventTypeID=4&EventID=${m.event.id}`
              );
              odds.forEach((item) => bookmakers.push(item));
            } catch (err) {}
          })
        );

        let bookmakerMarkets = "";

        bookmakers.forEach((item, index) => {
          bookmakerMarkets += `${index === 0 ? "" : ","}${item.marketId}`;
        });

        bookmakers =
          bookmakers.length > 0
            ? await callApi(
                `/getBookmakerOdds?EventTypeID=4&marketId=${bookmakerMarkets}`
              )
            : [];

        oddsMap.set("cricketBookmakers", {
          data: bookmakers,
          updatedAt: currentTime,
        });
      }
      // ------------------ get match bookmakers end -------------------

      // ------------------ get match sessions -----------------------
      if (allCricketMatches) {
        const matchSessions = [];

        await Promise.all(
          allCricketMatches.map(async (m, mI) => {
            try {
              const sessions = await callApi(
                `/getSessions?EventTypeID=4&matchId=${m.event.id}`
              );
              matchSessions[mI] = { matchId: m.event.id, sessions };
            } catch (err) {
              matchSessions[mI] = null;
            }
          })
        );

        oddsMap.set("cricketSessions", {
          data: matchSessions,
          updatedAt: currentTime,
        });
      }
      // ------------------ get match sessions end -------------------
    };

    const football = async () => {
      const currentTime = new Date();

      const footballTournaments = oddsMap.get("footballTournaments");
      const allFootballMatches = oddsMap.get("allFootballMatches");
      const footballMatchOds = oddsMap.get("footballOds");
      const footballMatchBookmakers = oddsMap.get("footballBookmakers");

      // -------------------- update tournaments -------------------------
      if (
        !footballTournaments ||
        currentTime.getTime() - footballTournaments.updatedAt.getTime() >
          timing.tournaments
      ) {
        const tournaments = await callApi(
          "/fetch_data?Action=listCompetitions&EventTypeID=1"
        );

        oddsMap.set("footballTournaments", {
          data: tournaments,
          updatedAt: currentTime,
        });

        const allMatches = [];

        await Promise.all(
          tournaments.map(async (t, tI) => {
            try {
              const matches = await callApi(
                `/fetch_data?Action=listEvents&EventTypeID=1&CompetitionID=${t.competition.id}`
              );
              matches.forEach((m) => allMatches.push(m));
              tournaments[tI] = { ...t, matches };
            } catch (err) {
              console.log(
                "🚀 ~ file: getOdds.js:52 ~ tournaments.map ~ err:",
                err
              );
            }
          })
        );

        oddsMap.set("footballTournaments", {
          data: tournaments,
          updatedAt: currentTime,
        });

        await Promise.all(
          allMatches.map(async (m, mI) => {
            try {
              const markets = await callApi(
                `/getMarkets?EventTypeID=1&EventID=${m.event.id}`
              );
              allMatches[mI].markets = markets;
            } catch (err) {
              console.log(
                "🚀 ~ file: getOdds.js:73 ~ allMatches.map ~ err:",
                err
              );
            }
          })
        );

        oddsMap.set("allFootballMatches", allMatches);
      }
      // ------------------- update tournaments end ----------------------

      // ------------------ get match ods -----------------------
      if (
        (!footballMatchOds ||
          currentTime.getTime() - footballMatchOds.updatedAt.getTime() >
            timing.odds) &&
        allFootballMatches
      ) {
        let matchesOds = [];

        await Promise.all(
          allFootballMatches.map(async (m, mI) => {
            try {
              let markets = "";

              m.markets.forEach((item, index) => {
                markets += `${index === 0 ? "" : ","}${item.marketId}`;
              });

              const odds = await callApi(
                `/getMarketsOdds?EventTypeID=1&marketId=${markets}`
              );
              matchesOds = [...odds, ...matchesOds];
            } catch (err) {
              console.log(
                "🚀 ~ file: getOdds.js:273 ~ allFootballMatches.map ~ err:",
                err
              );
            }
          })
        );

        oddsMap.set("footballOds", {
          data: matchesOds,
          updatedAt: currentTime,
        });
      }
      // ------------------ get match ods end -------------------
    };

    const tennis = async () => {
      const currentTime = new Date();

      const tennisTournaments = oddsMap.get("tennisTournaments");
      const allTennisMatches = oddsMap.get("allTennisMatches");
      const tennisMatchOds = oddsMap.get("tennisOds");

      // -------------------- update tournaments -------------------------
      if (
        !tennisTournaments ||
        currentTime.getTime() - tennisTournaments.updatedAt.getTime() >
          timing.tournaments
      ) {
        const tournaments = await callApi(
          "/fetch_data?Action=listCompetitions&EventTypeID=2"
        );

        oddsMap.set("tennisTournaments", {
          data: tournaments,
          updatedAt: currentTime,
        });

        const allMatches = [];

        await Promise.all(
          tournaments.map(async (t, tI) => {
            try {
              const matches = await callApi(
                `/fetch_data?Action=listEvents&EventTypeID=2&CompetitionID=${t.competition.id}`
              );
              matches.forEach((m) => allMatches.push(m));
              tournaments[tI] = { ...t, matches };
            } catch (err) {
              console.log(
                "🚀 ~ file: getOdds.js:52 ~ tournaments.map ~ err:",
                err
              );
            }
          })
        );

        oddsMap.set("tennisTournaments", {
          data: tournaments,
          updatedAt: currentTime,
        });

        await Promise.all(
          allMatches.map(async (m, mI) => {
            try {
              const markets = await callApi(
                `/getMarkets?EventTypeID=2&EventID=${m.event.id}`
              );
              allMatches[mI].markets = markets;
            } catch (err) {
              console.log(
                "🚀 ~ file: getOdds.js:73 ~ allMatches.map ~ err:",
                err
              );
            }
          })
        );

        oddsMap.set("allTennisMatches", allMatches);
      }
      // ------------------- update tournaments end ----------------------

      // ------------------ get match ods -----------------------
      if (
        (!tennisMatchOds ||
          currentTime.getTime() - tennisMatchOds.updatedAt.getTime() >
            timing.odds) &&
        allTennisMatches
      ) {
        let matchesOds = [];

        await Promise.all(
          allTennisMatches.map(async (m, mI) => {
            try {
              let markets = "";

              m.markets.forEach((item, index) => {
                markets += `${index === 0 ? "" : ","}${item.marketId}`;
              });

              const odds = await callApi(
                `/getMarketsOdds?EventTypeID=2&marketId=${markets}`
              );
              matchesOds = [...odds, ...matchesOds];
            } catch (err) {
              console.log(
                "🚀 ~ file: getOdds.js:273 ~ allTennisMatches.map ~ err:",
                err
              );
            }
          })
        );

        oddsMap.set("tennisOds", {
          data: matchesOds,
          updatedAt: currentTime,
        });
      }
      // ------------------ get match ods end -------------------
    };

    nodeCron.schedule("*/5 * * * * *", () => {
      cricket();
      football();
      tennis();
    });
  } catch (err) {
    console.log("🚀 ~ file: getOdds.js:5 ~ getOdds ~ err:", err);
  }
};

module.exports = getOdds;
