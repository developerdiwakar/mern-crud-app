const _ = require('lodash');
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
            res.send({
                message: "Tutorial created successfully",
                data: data
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Tutorial"
            });
        });
}

// Fetch all tutorials (with conditions)
exports.findAll = (req, res) => {
    let title = req.query.title;
    let condition = title ? { title: {$regex: new RegExp(title), $options: "i"} } : {};
    // Get all tutorials
    Tutorial.find(condition)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving data"
            });
        });
}

// Find One Tutorial by ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findById(id)
        .then(data => {
            if(! data){
                res.status(404).send({
                    message: `Tutorial not found with id ${id}`
                });
            }else{
                res.status(200).send({
                    message: "Tutorial Found",
                    data: data
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error while retrieving Tutorial with ${id}`
            });
        });
}

// Update a tutorial
exports.update = (req, res) => {
    
    if(_.isEmpty(req.body)){
        return res.status(400).send({message: "Content must not be empty"});
    }
    const id = req.params.id;
    Tutorial.findByIdAndUpdate(id, req.body, {new: true})
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: 
                        `Can't update tutorial. Might be tutorial with ${id} is not available`
                });
            }else{
                res.status(200).send({
                    message: "Tutorial updated successfully",
                    data: data
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Update Error! Can't find tutorial with id ${id}`
            });
        });

}

// Delete Tutorial by ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.findByIdAndRemove(id)
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: 
                        `Can't delete tutorial. Might be tutorial with ${id} is not available`
                });
            }else{
                res.status(200).send({
                    message: "Tutorial deleted successfully"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Delete Error! Can't find tutorial with id ${id}`
            });
        });
};