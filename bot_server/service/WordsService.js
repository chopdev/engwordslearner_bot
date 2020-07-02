const { Word } = require("../models/wordEntity");
const { TelegramAPI } = require("../repository/messageSender");
const { SendMessage } = require("../models/sendMessage");

class WordsService {
    SHOW_NEXT = "#^#show_next@^@";

    constructor(dbRepository) {
        this.repository = dbRepository;
    }

    async sendTranslation(fromUserId, word) {
        if (fromUserId == null || word == null || word == '') {
            throw new Error(`getTranslation invalid arguments - fromUserId: ${fromUserId}; word: ${word}`);
        }

        this.repository.saveUser(fromUserId);
        const wordEntity = this.repository.getWordForKey(word);

        TelegramAPI.postData(TelegramAPI.SEND_MESSAGE, new SendMessage(fromUserId, this.getTranslationText(wordEntity), {
            inline_keyboard: [[{text: "Show next", callback_data: this.SHOW_NEXT}]]
        }));
    }

    async sendNextWord(userId) {
        if (userId == null) {
            throw new Error(`sendNextWord invalid arguments - userId: ${userId}`);
        }

        const wordEntity = this.repository.getRandomWord();
        TelegramAPI.postData(TelegramAPI.SEND_MESSAGE, new SendMessage(userId, `<b>Translation:</b>\n${wordEntity.translations}`, {
            inline_keyboard: [[{text: "Show the word", callback_data: wordEntity.eng}]]
        }));
    }

    getTranslationText(wordEntity) {
        const word = `<b>Word:</b>\n${wordEntity.eng}`;
        const translations = `<b>Translation:</b>\n${wordEntity.translations}`;
        const examples = `<b>Examples:</b>\n${wordEntity.examples}`;
        const translateLink = `<a href="https://translate.google.com/?hl=ru#view=home&op=translate&sl=en&tl=ru&text=${wordEntity.eng}">Google translate</a>`;
        const dictionaryLink = `<a href="https://www.dictionary.com/browse/${wordEntity.eng}">www.dictionary.com</a>`;
        if (wordEntity.examples) {
            return [word, translations, examples, translateLink, dictionaryLink].join('\n\n');
        }
        
        return [word, translations, translateLink, dictionaryLink].join('\n\n');
    }
}

exports.WordsService = WordsService;