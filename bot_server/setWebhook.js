const config = require("./config/configData");
const {TelegramAPI} = require("./repository/messageSender");
const fs = require('fs');

/** 
 * Send endpoint url for getting updates from telegram
*/
TelegramAPI.postData(`${TelegramAPI.SET_WEBHOOK}`, {
    url: config.service_url
});
