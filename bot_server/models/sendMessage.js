/* https://core.telegram.org/bots/api#sendmessage */
class SendMessage {
    constructor(chatId, message, reply_markup = null) {
        this.chat_id = chatId;
        this.text = message;
        if (reply_markup) {
            this.reply_markup = reply_markup;
        }    
        this.parse_mode = 'html';
        // disable links preview
        this.disable_web_page_preview = true;
    }
}

exports.SendMessage = SendMessage;