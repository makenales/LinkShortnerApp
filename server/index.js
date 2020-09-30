const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const linkController = require("./controllers/link.controller");
const db = require("./models");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello from LinkShortner App." });
});

app.get("/:code", linkController.redirect);

app.post("/api/generate", linkController.generate);

app.get("/api/stats", linkController.stats);

// sync database to create tables if does not exists already
db.sequelize.sync({ force: false }).then(() => {
    // set port, listen for requests
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}).catch((err) => {
    console.log("An error occured while syncing with database. Please check values in dbConfig.json file.");
});

module.exports = app;