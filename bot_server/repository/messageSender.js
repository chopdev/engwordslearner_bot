const config = require("../config/configData");
const telegram_url = `https://api.telegram.org/bot${config.token}/`;
const telegram_file_api = `https://api.telegram.org/file/bot${config.token}/`;
const axios = require('axios');
const fs = require('fs')  
const path = require('path')  

class TelegramAPI {

  static async sendMessageToAdmin(data) {
    return TelegramAPI.sendMessageToUser(config.user_id, data);
  }

  static async sendMessageToUser(userId, data) {
    const textData = (typeof data === 'string') ? data : JSON.stringify(data);
    await TelegramAPI.getData(`${TelegramAPI.SEND_MESSAGE}?chat_id=${userId}&text=${encodeURIComponent(textData)}`);
  }

  static async downloadFile(telegramFilePath, outputFineName) {
    const outputFilePath = `/tmp/${outputFineName}`;
    const writer = fs.createWriteStream(outputFilePath);

    try {
      const response = await axios.get(telegram_file_api + telegramFilePath, {
        responseType: "stream"
      });
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => {
          writer.close();
          resolve(outputFilePath);
        });
        writer.on('error', (err) => {
          reject(err);
        });
      })

    } catch (error) {
      writer.close();
      console.log(error);
      throw error;
    }
  }

  static async getData(operation) {
    return await TelegramAPI.getDataWithUrl(telegram_url + operation);
  }

  static async postData(operation, data = {}) {
    return await TelegramAPI.postDataWithUrl(telegram_url + operation, data);
  }

  static async getDataWithUrl(url) {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async postDataWithUrl(url, data = {}) {
    try {
      const response = await axios({
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

}

TelegramAPI.SEND_MESSAGE = "sendMessage";
TelegramAPI.SET_WEBHOOK = "setWebhook";
TelegramAPI.GET_WEBHOOK_INFO = "getWebhookInfo";
TelegramAPI.GET_FILE = "getFile";

exports.TelegramAPI = TelegramAPI;
