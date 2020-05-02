const config = require("./config/configData");
const {TelegramAPI} = require("./repository/messageSender");
const { SendMessage } = require("./models/sendMessage");

const url = `https://api.telegram.org/bot${config.token}/`;


/** 
 * Send endpoint url for getting updates from telegram
*/
// request.getData(`setWebhook?url=${config.ngrok}/${config.token}/update`);


/* request.postData("sendMessage", new SendMessage(config.user_id, "Hello!", {
    inline_keyboard: [[{text: "Button label", callback_data: "callback"}]]
})); */

TelegramAPI.postData("sendMessage", new SendMessage(config.user_id, "Hello! \n New line", {
    inline_keyboard: [[{text: "Button label", callback_data: "callback"}]]
}));