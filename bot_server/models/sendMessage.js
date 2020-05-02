/* https://core.telegram.org/bots/api#sendmessage */
class SendMessage {
    constructor(chatId, message, reply_markup = null) {
        this.chat_id = chatId;
        this.text = message;
        if (reply_markup) {
            this.reply_markup = reply_markup;
        }        
    }
}

exports.SendMessage = SendMessage;