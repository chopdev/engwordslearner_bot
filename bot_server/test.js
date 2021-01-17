const config = require("./config/configData");
const {TelegramAPI} = require("./repository/messageSender");
const { SendMessage } = require("./models/sendMessage");
const { WordsService } = require("./service/wordsService");
const fs = require('fs');
const { DbRepository } = require("./repository/databaseRetriever");
const { QueueRepository } = require("./repository/queueRepository");
const { WordsUploader } = require("./service/wordsUploader");
const { FileService } = require("./service/fileService");
const AWS = require('aws-sdk');
const { getWordsFromFile } = require("./parser/parser");
const { Word } = require("./models/wordEntity");
const { getWordsFromExcel } = require("./parser/excelParser");

/** 
 * Send test message
*/
/* TelegramAPI.postData(TelegramAPI.SEND_MESSAGE, new SendMessage(config.user_id, "<b>Translation:</b>\nsome text<b>\n\nExamples:</b>\nThe client’s name and address have been withheld for security reasons.", {
    inline_keyboard: [[{text: "Button label", callback_data: "callback1"}]]
})); */


;; (async () => {

    //const repo = new DbRepository();
    //const serv = new WordsService(repo);
    //await repo.init();
    
    //const word = await repo.getWordForKey("beyond");
    //console.log(serv.getTranslationText())

    try {


    } catch(er) {
        console.error(er);
    }
    
    
})();



/* const repo = new DbRepository();
const words = getWordsFromFile();
for(const word of words) {
repo.saveWord(word, config.user_id);
} */


