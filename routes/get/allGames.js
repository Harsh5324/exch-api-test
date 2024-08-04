const { default: axios } = require("axios");

const allGames = async (req, resp) => {
  try {
    const { provider } = req.query;

    const { data } = await axios.post(
      "https://stageapi.worldcasinoonline.com/api/games",
      {
        partnerKey:
          "lEOB6coQW4dCP15QXQwwAGYVtQCpEe09eHv36alfG4ykysWGZ1BLlBHBm9W77XmL",
        ...(provider && { providerCode: provider }),
      }
    );

    if (data.games.length === 0) return resp.fail("Invalid provider");

    resp.suc(data.data.games);
  } catch (err) {
    console.log("🚀 ~ file: allGames.js:5 ~ allGames ~ err:", err);
    resp.fail();
  }
};

module.exports = allGames;
