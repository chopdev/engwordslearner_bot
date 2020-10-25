const { getWordsFromExcel } = require("../parser/excelParser");
const { getWordsFromFile } = require("../parser/parser");
const { DbRepository } = require("../repository/databaseRetriever");
const { QueueRepository } = require("../repository/queueRepository");
const config = require("../config/configData");


;; (async () => {

    const words = getWordsFromExcel('/tmp/taras_words1.xlsx');
    //const words = getWordsFromExcel('/tmp/yanilov_words_1.xlsx');
    console.log(words);

    console.log("COUNT:" + words.length);


    const repo = new DbRepository();
    const queueRepository = new QueueRepository();

    for(const word of words) {
        await repo.saveWord(word, config.user_id);
        await queueRepository.addWord(word.eng)
    }

})();

