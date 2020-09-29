const config = require("../config/configData");

const { WordsService } = require("./service/WordsService");
const { DbRepository } = require("./repository/databaseRetriever");

const dbRepository = new DbRepository();
let service = new WordsService(dbRepository);


/**
 * Lambda that listens to updates from telegram servers 
 * with the help of aws API Gateway
 * URL of that endpoint is set by 'setWebhook' telegram api
 */
exports.handler = async (event) => {
    
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
};