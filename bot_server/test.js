const config = require("./config/configData");
const {TelegramAPI} = require("./repository/messageSender");
const { SendMessage } = require("./models/sendMessage");
const { WordsService } = require("./service/WordsService");
const fs = require('fs');


/** 
 * Send endpoint url for getting updates from telegram
*/
//TelegramAPI.getData(`${TelegramAPI.SET_WEBHOOK}?url=${config.ec2}/${config.token}/update&certificate=${cert}`);

TelegramAPI.postFormData(`${TelegramAPI.SET_WEBHOOK}?url=${config.ec2}/${config.token}/update`, {
    certificate: fs.createReadStream(__dirname + '/config/ENG_BOT_PUBLIC.pem')
});



/** 
 * Send test message
*/
/* TelegramAPI.postData(TelegramAPI.SEND_MESSAGE, new SendMessage(config.user_id, "<b>Translation:</b>\nsome text<b>\n\nExamples:</b>\nThe client’s name and address have been withheld for security reasons.", {
    inline_keyboard: [[{text: "Button label", callback_data: "callback1"}]]
})); */

