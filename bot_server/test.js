const config = require("./config/configData");
const {TelegramAPI} = require("./repository/messageSender");
const { SendMessage } = require("./models/sendMessage");
const { WordsService } = require("./service/WordsService");
const fs = require('fs');



/** 
 * Send test message
*/
/* TelegramAPI.postData(TelegramAPI.SEND_MESSAGE, new SendMessage(config.user_id, "<b>Translation:</b>\nsome text<b>\n\nExamples:</b>\nThe client’s name and address have been withheld for security reasons.", {
    inline_keyboard: [[{text: "Button label", callback_data: "callback1"}]]
})); */

