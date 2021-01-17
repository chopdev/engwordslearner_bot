const { WordsService } = require("../service/wordsService");
const { WordsUploader } = require("../service/wordsUploader");
const { FileService } = require("../service/fileService");
const { DbRepository } = require("../repository/databaseRetriever");
const { QueueRepository } = require("../repository/queueRepository");
const { TelegramAPI } = require("../repository/messageSender");
const config = require("../config/configData");

const dbRepository = new DbRepository();
const queueRepository = new QueueRepository();
const service = new WordsService(dbRepository, queueRepository);
const wordsUploader = new WordsUploader(dbRepository, queueRepository);
const fileService = new FileService(wordsUploader);

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

    if (body.message && body.message.from && body.message.from.id != config.user_id) {
        await TelegramAPI.sendMessageToAdmin(body);
    }

    try {
        if (body.callback_query) { // button response
            const msg = body.callback_query;
            if (msg.data === service.SHOW_NEXT)
                await service.sendNextWord(msg.from.id);
            else
                await service.sendTranslation(msg.from.id, msg.data);
        } else if (body.message && body.message.text) { // text message
            await service.sendNextWord(body.message.from.id);
        } else if (body.message && body.message.document && body.message.from.id == config.user_id){ // file message   
            const fileInfo = await fileService.saveWordsFromFile(body.message.document);
        }
    }
    catch(ex) {
        console.error(ex);
        await TelegramAPI.sendMessageToAdmin("Failed to process request: " + ex);
    }

    // important to return successful result, cause telegram will re-make the query
    return "Ok";
}