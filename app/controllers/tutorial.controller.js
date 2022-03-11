const db = require('../models');
const Tutorial = db.tutorials;
// Create and Save new tutorial
exports.create = (req, res) => {
    if(!req.body.title){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }
    // Create tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ?? false
    });

    // Save the tutorial
    tutorial.save(tutorial)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Tutorial"
            });
        });
}