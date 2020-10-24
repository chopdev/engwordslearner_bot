const config = require("../config/configData");
const telegram_url = `https://api.telegram.org/bot${config.token}/`;
const axios = require('axios');

class TelegramAPI {

  static async sendMessageToUser(userId, data) {
    const textData = (typeof data === 'string') ? data : JSON.stringify(data);
    await TelegramAPI.getData(`${TelegramAPI.SEND_MESSAGE}?chat_id=${userId}&text=${encodeURIComponent(textData)}`);
  }

  static async getData(operation) {
    try {
      const response = await axios.get(telegram_url + operation);
    } catch (error) {
      console.log(error);
    }
  }

  static async postData(operation, data = {}) {
    try {
      const response = await axios({
        method: 'POST',
        url: telegram_url + operation,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      });
    } catch (error) {
      console.log(error);
    }
  }
}

TelegramAPI.SEND_MESSAGE = "sendMessage";
TelegramAPI.SET_WEBHOOK = "setWebhook";
TelegramAPI.GET_WEBHOOK_INFO = "getWebhookInfo";


exports.TelegramAPI = TelegramAPI;
