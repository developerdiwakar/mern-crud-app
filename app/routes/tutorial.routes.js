module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js")
    var router = require('express').Router();

    // Create new tutorial
    router.post("/", tutorials.create);

    // Set the tutorial routes path
    app.use("/api/tutorials", router);
}