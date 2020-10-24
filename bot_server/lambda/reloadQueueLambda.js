const { DbRepository } = require("../repository/databaseRetriever");
const { QueueRepository } = require("../repository/queueRepository");
const { QueueUploader } = require("../service/queueUploader");
const { TelegramAPI } = require("../repository/messageSender");
const config = require("../config/configData");

const dbRepository = new DbRepository();
const queueRepository = new QueueRepository();
const queueUploader = new QueueUploader(dbRepository, queueRepository);

/**
 * Lambda that is triggered by timer 
 * to shuffle and update queue of words
 */
exports.handler = async (event, context) => {
    console.log(`[INFO] Start to reload the queue: ${config.sqs_url}`);
    // update admin about event
    await TelegramAPI.sendMessageToUser(config.user_id, "[INFO] Start to reload the queue");
    await queueUploader.backfillQueue();
    return "Ok";
}

