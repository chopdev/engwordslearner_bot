const { Word } = require("../models/wordEntity");
const { TelegramAPI } = require("../repository/messageSender");
const { SendMessage } = require("../models/sendMessage");

class WordsService {
    SHOW_NEXT = "#^#show_next@^@";

    constructor(dbRepository, queueRepository) {
        this.repository = dbRepository;
        this.queueRepository = queueRepository;
    }

    async sendTranslation(fromUserId, word) {
        if (fromUserId == null || word == null || word == '') {
            throw new Error(`getTranslation invalid arguments - fromUserId: ${fromUserId}; word: ${word}`);
        }

        const wordEntity = await this.repository.getWordForKey(word);

        await TelegramAPI.postData(TelegramAPI.SEND_MESSAGE, new SendMessage(fromUserId, this.getTranslationText(wordEntity), {
            inline_keyboard: [[{text: "Show next", callback_data: this.SHOW_NEXT}]]
        }));
    }

    async sendNextWord(userId) {
        if (userId == null) {
            throw new Error(`sendNextWord invalid arguments - userId: ${userId}`);
        }

        const wordKey = await this.queueRepository.getNextWord();
        const wordEntity = await this.repository.getWordForKey(wordKey);
        await this.queueRepository.addWord(wordKey); // add key back into the queue

        await TelegramAPI.postData(TelegramAPI.SEND_MESSAGE, new SendMessage(userId, `<b>Translation:</b>\n${wordEntity.translations}`, {
            inline_keyboard: [[{text: "Show the word", callback_data: wordEntity.eng}]]
        }));
    }

    getTranslationText(wordEntity) {
        const word = `<b>Word:</b>\n${wordEntity.eng}`;
        const synonyms = `<b>Synonyms:</b>\n${wordEntity.synonyms}`;
        const translations = `<b>Translation:</b>\n${wordEntity.translations}`;
        const examples = `<b>Examples:</b>\n${wordEntity.examples}`;
        const translateLink = `<a href="https://translate.google.com/?hl=ru#view=home&op=translate&sl=en&tl=ru&text=${wordEntity.eng}">Google translate</a>`;
        const dictionaryLink = `<a href="https://www.dictionary.com/browse/${wordEntity.eng}">www.dictionary.com</a>`;
        
        const messageArr = [word, translations, translateLink, dictionaryLink]
        
        if (wordEntity.examples) {
            messageArr.splice(2, 0, examples);
        }

        if (wordEntity.synonyms) {
            messageArr.splice(2, 0, synonyms);
        }
        
        return messageArr.join('\n\n');
    }
}

exports.WordsService = WordsService;