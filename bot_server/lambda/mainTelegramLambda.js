const { WordsService } = require("../service/wordsService");
const { DbRepository } = require("../repository/databaseRetriever");
const { QueueRepository } = require("../repository/queueRepository");
const config = require("../config/configData");

const dbRepository = new DbRepository();
const queueRepository = new QueueRepository();
let service = new WordsService(dbRepository, queueRepository);

/**
 * Lambda that listens to updates from telegram servers 
 * with the help of aws API Gateway
 * URL of that endpoint is set by 'setWebhook' telegram api
 */
exports.handler = async (event, context) => {
    
    let body = JSON.parse(event.body);

    if (!body) {
        console.warn("Body not found");
        return false;
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

    // important to return successful result, cause telegram will re-make the query
    return "Ok";
}