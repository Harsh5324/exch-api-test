const { app, router } = require("harsh-router");

const checkApi = require("./checkApi");
const casinoApi = require("./casinoApis");

app.listen(82);

router.post("/", checkApi);
router.post("/2", casinoApi);
