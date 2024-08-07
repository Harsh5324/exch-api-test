const groupBy = require("lodash.groupby");
const { default: axios } = require("axios");
const cron = require("node-cron");

const { sportApiBaseURL } = require("../config");

const getData = require("./getData");
const addData = require("./addData");

const declareReults = async (sport = 0) => {
  const sessionsResult = async () => {
    try {
      const eventTypeId = { 0: 4, 1: 1, 2: 2 }[sport];

      const { data: sessions } = await getData(
        null,
        "bets",
        `sport = ${sport} && status = 0 && type = 'session'`
      );

      const selectionIds = Object.keys(groupBy(sessions, "selectionId"));
      const results = [];
      const selectionIdsArr = [];

      selectionIds.forEach((item, index) => {
        const arrIndex = Math.floor(index / 25);
        const eventId = sessions.find((s) => s.selectionId === item).eventId;
        selectionIdsArr[arrIndex] = !selectionIdsArr[arrIndex]
          ? `${eventId}_${item}`
          : `${selectionIdsArr[arrIndex]},${eventId}_${item}`;
      });

      await Promise.all(
        selectionIdsArr.map(async (selectionIds) => {
          try {
            const { data } = await axios.get(
              `${sportApiBaseURL}/sessionsResults?EventTypeID=${eventTypeId}&marketId=${selectionIds}`
            );
            data.forEach((item) => results.push(item));
          } catch (err) {
            console.log("Sessions result get err: ", err);
          }
          return selectionIds;
        })
      );

      for (let result of results) {
        const [eventId, selectionId] = result.id.split("_");
        result = parseFloat(result.result);

        const bets = sessions.filter(
          (s) => s.selectionId === selectionId && s.eventId === eventId
        );

        for (const bet of bets) {
          const status =
            bet.isBack == 1
              ? result >= parseFloat(bet.odds)
              : result < parseFloat(bet.odds);

          let {
            data: [{ balance }],
          } = await getData("balance", "users", `_id = ${bet.user}`);

          balance = status
            ? balance + parseFloat(bet.amount) * parseFloat(bet.x)
            : balance;

          await addData(
            {
              _id: bet._id,
              balance: balance.toFixed(2),
              status: status ? 1 : 2,
            },
            "bets"
          );

          await addData({ _id: bet.user, balance }, "users");
        }
      }
    } catch (err) {
      console.log("🚀 ~ file: declareResults.js:5 ~ declareReults ~ err:", err);
    }
  };

  const oddsResults = async () => {
    try {
      const eventTypeId = { 0: 4, 1: 1, 2: 2 }[sport];

      const { data: odds } = await getData(
        null,
        "bets",
        `sport = ${sport} && status = 0 && type = 'odds'`
      );

      const marketIds = Object.keys(groupBy(odds, "marketId"));
      const results = [];
      const marketIdsArr = [];

      marketIds.forEach((item, index) => {
        const arrIndex = Math.floor(index / 25);
        const marketId = odds.find((s) => s.marketId === item).marketId;
        marketIdsArr[arrIndex] = !marketIdsArr[arrIndex]
          ? `${marketId}`
          : `${marketIdsArr[arrIndex]},${marketId}`;
      });

      await Promise.all(
        marketIdsArr.map(async (marketIds) => {
          try {
            const { data } = await axios.get(
              `${sportApiBaseURL}/oddsResults?EventTypeID=${eventTypeId}&marketId=${marketIds}`
            );
            data.forEach((item) => results.push(item));
          } catch (err) {
            console.log("odds result get err: ", err);
          }
          return marketIds;
        })
      );

      for (let result of results) {
        const marketId = result.id;
        result = result.result;

        const bets = odds.filter((s) => s.marketId === marketId);

        for (const bet of bets) {
          const status =
            bet.isBack == 1
              ? result == bet.selectionId
              : result != bet.selectionId;

          let {
            data: [{ balance }],
          } = await getData("balance", "users", `_id = ${bet.user}`);

          balance = parseFloat(balance);
          balance = status
            ? balance + parseFloat(bet.amount) * parseFloat(bet.x)
            : balance;

          await addData(
            {
              _id: bet._id,
              balance: balance.toFixed(2),
              status: status ? 1 : 2,
            },
            "bets"
          );

          await addData({ _id: bet.user, balance }, "users");
        }
      }
    } catch (err) {
      console.log("🚀 ~ file: declareResults.js:5 ~ declareReults ~ err:", err);
    }
  };

  const bookmakersResults = async () => {
    try {
      const eventTypeId = { 0: 4, 1: 1, 2: 2 }[sport];

      const { data: odds } = await getData(
        null,
        "bets",
        `sport = ${sport} && status = 0 && type = 'bookmaker'`
      );

      const marketIds = Object.keys(groupBy(odds, "marketId"));
      const results = [];
      const marketIdsArr = [];

      marketIds.forEach((item, index) => {
        const arrIndex = Math.floor(index / 25);
        const marketId = odds.find((s) => s.marketId === item).marketId;
        marketIdsArr[arrIndex] = !marketIdsArr[arrIndex]
          ? `${marketId}`
          : `${marketIdsArr[arrIndex]},${marketId}`;
      });

      await Promise.all(
        marketIdsArr.map(async (marketIds) => {
          try {
            const { data } = await axios.get(
              `${sportApiBaseURL}/oddsResults?EventTypeID=${eventTypeId}&marketId=${marketIds}`
            );
            data.forEach((item) => results.push(item));
          } catch (err) {
            console.log("odds result get err: ", err);
          }
          return marketIds;
        })
      );

      for (let result of results) {
        const marketId = result.id;
        result = result.result;

        const bets = odds.filter((s) => s.marketId === marketId);

        for (const bet of bets) {
          const status =
            bet.isBack == 1
              ? result == bet.selectionId
              : result != bet.selectionId;

          let {
            data: [{ balance }],
          } = await getData("balance", "users", `_id = ${bet.user}`);

          balance = parseFloat(balance);
          balance = status
            ? balance + parseFloat(bet.amount) * parseFloat(bet.x)
            : balance;

          await addData(
            {
              _id: bet._id,
              balance: balance.toFixed(2),
              status: status ? 1 : 2,
            },
            "bets"
          );

          await addData({ _id: bet.user, balance }, "users");
        }
      }
    } catch (err) {
      console.log("🚀 ~ file: declareResults.js:5 ~ declareReults ~ err:", err);
    }
  };

  if (sport == 0)
    cron.schedule(`*/${sport + 5} * * * *`, () => {
      sessionsResult();
    });

  cron.schedule(`*/${sport + 7} * * * *`, () => {
    oddsResults();
    bookmakersResults();
  });
};

module.exports = declareReults;
