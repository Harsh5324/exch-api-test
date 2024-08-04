const { oddsMap } = require("../../functions/map");

const tournaments = (req, resp) => {
  const { sport } = req.params;

  const { data } = oddsMap.get(`${sport}Tournaments`);

  resp.suc(data);
};

module.exports = tournaments;
