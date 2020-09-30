const config = require("./config/configData");
const {TelegramAPI} = require("./repository/messageSender");
const fs = require('fs');

/** 
 * Send endpoint url for getting updates from telegram
*/
TelegramAPI.postData(`${TelegramAPI.SET_WEBHOOK}`, {
    url: config.service_url
});


/** 
 * Send endpoint url for getting updates from telegram with a public pem file of SSL
 * Telegram works only with https 
*/
/* TelegramAPI.postFormData(`${TelegramAPI.SET_WEBHOOK}?url=${config.service_url}/wordsBot/update`, {
    certificate: fs.createReadStream(__dirname + '/config/ENG_BOT_PUBLIC.pem')
}); */
