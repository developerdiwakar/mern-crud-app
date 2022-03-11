require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');


// Create express app object
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Simple route
app.get("/", (req, res) => {
    res.json({ message: "Rest APIs - developed in ExpressJS and MongoDB" });
});

const db = require('./app/models'); // models/index
// Connect to Database
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(() => {
        console.log("Cannot connect to the database");
        process.exit;
    });

// Load All App routes
require("./app/routes")(app);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});