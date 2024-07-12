const { app, router } = require("harsh-router");

const checkApi = require("./checkApi");

app.listen(82);

router.post("/", checkApi);
