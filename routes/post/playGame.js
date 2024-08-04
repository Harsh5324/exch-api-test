const { default: axios } = require("axios");
const timestamp = require("unix-timestamp");

const { authenticate } = require("../../functions/token");
const getData = require("../../functions/getData");

const playGame = async (req, resp) => {
  try {
    const { body } = req;

    const user = await authenticate(req, resp);

    const {
      data: [userData],
    } = await getData(null, "users", `_id = ${user}`);

    const { data } = await axios.post(
      "https://stageapiauth.worldcasinoonline.com/api/auth/userauthentication",
      {
        partnerKey:
          "lEOB6coQW4dCP15QXQwwAGYVtQCpEe09eHv36alfG4ykysWGZ1BLlBHBm9W77XmL",
        game: {
          gameCode: body.code,
          providerCode: body.provider,
        },
        timestamp: Math.floor(timestamp.now()).toString(),
        user: {
          id: user.toString(),
          currency: "INR",
          displayName: userData.username,
          backUrl: "http://192.168.0.104:5173",
        },
      }
    );

    if (!data.data.launchURL) return resp.fail("Error while playing game");

    resp.suc({ iframe: data.data.launchURL });
  } catch (err) {
    console.log("🚀 ~ file: playGame.js:5 ~ playGame ~ err:", err);
    resp.fail();
  }
};

module.exports = playGame;
