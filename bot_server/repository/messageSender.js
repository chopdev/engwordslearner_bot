const fetch = require("node-fetch");
const config = require("../config/configData");

class TelegramAPI {

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
  
}

exports.TelegramAPI = TelegramAPI;
