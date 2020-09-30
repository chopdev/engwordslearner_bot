const { getWordsFromExcel } = require("../parser/excelParser");
const { getWordsFromFile } = require("../parser/parser");
const { QueueRepository } = require("../repository/queueRepository");
const { DbRepository } = require("../repository/databaseRetriever");
const config = require("../config/configData");
const { Word } = require("../models/wordEntity");

const repo = new DbRepository();
const queue = new QueueRepository();

async function backfillQueue() {
    const keys = await repo.getAllKeys();
    await queue.backfillQueue(shuffleArray(keys));
}

function shuffleArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

backfillQueue().then(x => console.log(x));
