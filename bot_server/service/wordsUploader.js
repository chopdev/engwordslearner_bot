const { getWordsFromExcel } = require("../parser/excelParser");
const { getWordsFromFile } = require("../parser/parser");
const { DbRepository } = require("../repository/databaseRetriever");
const config = require("../config/configData");


//const words = getWordsFromExcel('/tmp/yanilov_words_1.xlsx');
//const words = getWordsFromFile();

const repo = new DbRepository();

for(const word of words) {
    repo.saveWord(word, config.user_id);
}
