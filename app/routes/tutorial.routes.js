module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js")
    var router = require('express').Router();

    // Create new tutorial
    router.post("/", tutorials.create);
    // Retrieve All Tutorials
    router.get("/", tutorials.findAll);
    // Retrieve One tutorial
    router.get("/:id", tutorials.findOne);
    // Update tutorial
    router.put("/:id", tutorials.update);
    // Delete tutorial
    router.delete("/:id", tutorials.delete);
    // Set the tutorial routes path
    app.use("/api/tutorials", router);
}