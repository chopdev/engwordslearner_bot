const config = require("./config/configData");
const https = require('https');
const fs = require('fs');
const express = require('express');
const { WordsService } = require("./service/WordsService");

let service = new WordsService();
let app = express();
app.use(express.json());

const options = {
    key: fs.readFileSync(__dirname + '/config/ENG_BOT_PRIVATE.key', 'utf8'),
    cert: fs.readFileSync(__dirname + '/config/ENG_BOT_PUBLIC.pem', 'utf8'),
};

app.get('/', function (req, res) {
    res.send('Ok')
})

/**
 * Endpoint that listens to updates from telegram servers
 * URL of that endpoint is set by 'setWebhook' telegram api
 */
app.post(`/${config.token}/update`, async function (req, res) {
    let body = req.body;
    if (!body) {
        res.send('Ok');
        return;
    }

    try {
        if (body.callback_query) {
            const msg = body.callback_query;
            if (msg.data === service.SHOW_NEXT)
                await service.sendNextWord(msg.from.id);
            else
                await service.sendTranslation(msg.from.id, msg.data);
        } else if (body.message && body.message.text) {
            await service.sendNextWord(body.message.from.id);
        }
    }
    catch(ex) {
        console.error(ex);
    }
    
    res.send('Ok')
})


//app.listen(config.port, () => console.log(`listening at http://localhost:${config.port}`))

let server = https.createServer(options, app).listen(config.port, 
    () => console.log(`listening at http://localhost:${config.port}`));