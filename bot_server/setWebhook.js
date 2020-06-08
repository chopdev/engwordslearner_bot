const config = require("./config/configData");
const {TelegramAPI} = require("./repository/messageSender");
const fs = require('fs');

/** 
 * Send endpoint url for getting updates from telegram
*/
TelegramAPI.postFormData(`${TelegramAPI.SET_WEBHOOK}?url=${config.ec2}/${config.token}/update`, {
    certificate: fs.createReadStream(__dirname + '/config/ENG_BOT_PUBLIC.pem')
});
