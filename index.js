const { router, app } = require("harsh-router");

const getOdds = require("./functions/getOdds");

const sports = require("./routes/get/sports");
const tournaments = require("./routes/get/tournaments");
const cricketMarket = require("./routes/get/cricketMarket");
const marketId = require("./routes/get/marketId");
const footballmarket = require("./routes/get/footballMarket");
const tennisMarket = require("./routes/get/tennisMarket");
const slider = require("./routes/get/slider");

const login = require("./routes/post/login");
const addBet = require("./routes/post/addBet");
const allGames = require("./routes/get/allGames");
const playGame = require("./routes/post/playGame");
const balance = require("./routes/post/balance");
const debit = require("./routes/post/debit");
const credit = require("./routes/post/credit");
const checkOddsApi = require("./routes/post/checkOddsApi");

app.listen(82);

router.get("/", (_, resp) => resp.send("Hello from server"));
router.get("/sports", sports);
router.get("/tournaments/:sport", tournaments);
router.get("/cricket-market/:matchId", cricketMarket);
router.get("/football-market/:matchId", footballmarket);
router.get("/tennis-market/:matchId", tennisMarket);
router.get("/market-id/:eventId", marketId);
router.get("/slider", slider);
router.get("/all-games", allGames);

router.post("/login", login);
router.post("/add-bet", addBet);
router.post("/play-game", playGame);
router.post("/check-odds-api", checkOddsApi);
router.post("/wco/balance", balance);
router.post("/wco/debit", debit);
router.post("/wco/credit", credit);

getOdds();
