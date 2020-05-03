const config = require("./config/configData");
const {TelegramAPI} = require("./repository/messageSender");
const { SendMessage } = require("./models/sendMessage");
const { WordsService } = require("./service/WordsService");

const service = new WordsService();
service.sendTranslation(config.user_id, "withhold").catch((ex) => console.error(ex));
//service.sendNextWord(config.user_id).catch((ex) => console.error(ex));

/** 
 * Send endpoint url for getting updates from telegram
*/
//TelegramAPI.getData(`${TelegramAPI.SET_WEBHOOK}?url=${config.ngrok}/${config.token}/update`);


/* TelegramAPI.postData(TelegramAPI.SEND_MESSAGE, new SendMessage(config.user_id, "<b>Translation:</b>\nsome text<b>\n\nExamples:</b>\nThe client’s name and address have been withheld for security reasons.", {
    inline_keyboard: [[{text: "Button label", callback_data: "callback1"}]]
})); */

