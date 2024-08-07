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
      console.log("selectionIds: ", selectionIds);
      const results = [];
      const selectionIdsArr = [];

      selectionIds.forEach((item, index) => {
        const arrIndex = Math.floor(index / 25);
        const marketId = sessions.find((s) => s.selectionId === item).marketId;
        selectionIdsArr[arrIndex] += !selectionIdsArr[arrIndex]
          ? `${marketId}_${item}`
          : `,${marketId}_${item}`;
      });

      await Promise.all(
        selectionIdsArr.map(async (selectionIds) => {
          try {
            console.log("selectionIds: ", selectionIds);
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

          let balance = parseFloat(bet.balance);
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

  cron.schedule(`*/${sport + 5}  * * * *`, () => {
    sessionsResult();
  });
  sessionsResult();
};

module.exports = declareReults;
