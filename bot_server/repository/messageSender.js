const fetch = require("node-fetch");
const config = require("../config/configData");
const request = require("request");

class TelegramAPI {
  static SEND_MESSAGE = "sendMessage";
  static SET_WEBHOOK = "setWebhook";
  static GET_WEBHOOK_INFO = "getWebhookInfo";

  static async getData(operation) {
    try {
      const response = await fetch(config.telegram_url + operation);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  static async postData(operation, data = {}) {
    try {
      const response = await fetch(config.telegram_url + operation, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  static postFormData(operation, formData = {}) {
    request.post({url: config.telegram_url + operation, formData: formData}, function (err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log(body);
    });
  }
  
}

exports.TelegramAPI = TelegramAPI;
