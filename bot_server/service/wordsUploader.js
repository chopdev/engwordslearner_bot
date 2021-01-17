const { getWordsFromExcel } = require("../parser/excelParser");
const { getWordsFromFile } = require("../parser/parser");
const { DbRepository } = require("../repository/databaseRetriever");
const { QueueRepository } = require("../repository/queueRepository");
const config = require("../config/configData");

class WordsUploader {
    constructor(dbRepository, queueRepository) {
        this.repository = dbRepository;
        this.queueRepository = queueRepository;
    }
    
    async uploadWordsToDb(words) {
        const repo = new DbRepository();
        const queueRepository = new QueueRepository();

        for(const word of words) {
            await this.repository.saveWord(word, config.user_id);
            await this.queueRepository.addWord(word.eng)
        }
    }
}

exports.WordsUploader = WordsUploader;

