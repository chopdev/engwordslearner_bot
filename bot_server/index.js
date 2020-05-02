const config = require("./config/configData");
var express = require('express');
const { Word } = require("./models/wordEntity");
const { DbRepository } = require("./repository/databaseRetriever");
const { TelegramAPI } = require("./repository/messageSender");

var app = express();
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Ok')
})

/**
 * Endpoint that listens to updates from telegram servers
 * URL of that endpoint is set by 'setWebhook' telegram api
 */
app.post(`/${config.token}/update`, function (req, res) {
    if (req.body && req.body.message) {
        console.log("Got an update: "+ req.body.message);
    }
    
    res.send('Ok')
})


app.listen(config.port, () => console.log(`listening at http://localhost:${config.port}`))