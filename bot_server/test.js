const config = require("./config/configData");
const {TelegramAPI} = require("./repository/messageSender");
const { SendMessage } = require("./models/sendMessage");
const { WordsService } = require("./service/WordsService");
const fs = require('fs');
const { DbRepository } = require("./repository/databaseRetriever");
const AWS = require('aws-sdk');
const { getWordsFromFile } = require("./parser/parser");
const { Word } = require("./models/wordEntity");

/** 
 * Send test message
*/
/* TelegramAPI.postData(TelegramAPI.SEND_MESSAGE, new SendMessage(config.user_id, "<b>Translation:</b>\nsome text<b>\n\nExamples:</b>\nThe client’s name and address have been withheld for security reasons.", {
    inline_keyboard: [[{text: "Button label", callback_data: "callback1"}]]
})); */



;; (async () => {

    const repo = new DbRepository();
    //await repo.init();
    
    repo.getWordForKey("beyond").then(res => 
        console.log(res)
    );
  
})();



/* const repo = new DbRepository();
const words = getWordsFromFile();
for(const word of words) {
repo.saveWord(word, config.user_id);
} */


