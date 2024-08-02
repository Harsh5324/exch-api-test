const { app, router } = require("harsh-router");

const checkApi = require("./checkApi");
const casinoApi = require("./casinoApis");
const balance = require("./balance");
const debit = require("./debit");
const credit = require("./credit");

app.listen(82);

router.post("/", checkApi);
router.post("/2", casinoApi);
router.post("/wco/balance", balance);
router.post("/wco/debit", debit);
router.post("/wco/credit", credit);
