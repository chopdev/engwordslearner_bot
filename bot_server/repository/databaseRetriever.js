const config = require("../config/configData");
const { Word } = require("../models/wordEntity");
const { getWordsFromFile } = require("../parser/parser");

class DbRepository {

    constructor() {
        let words = getWordsFromFile();

        this.keys = [];
        this.wordsMap = new Map();
        for (let word of words) {
            this.keys.push(word.eng);
            this.wordsMap.set(word.eng, word);
        }

        this.users = new Set();
        this.users.add(config.user_id);
    }

    getAllUsers() {
        return this.users;
    }

    saveUser(id) {
        if (Number.isNaN(id)) {
            throw new Error(`Invalid chat id number: ${id}`)
        }
        this.users.add(id);
    }

    getRandomWord() {
        const rand = Math.round(Math.random() * (this.keys.length - 1));
        return this.wordsMap.get(this.keys[rand]);
    }

    getWordForKey(eng) {
        if (!this.wordsMap.has(eng)) {
            throw new Error(`Failed to find key in words map: ${eng}`)
        }
        return this.wordsMap.get(eng);
    }

}

exports.DbRepository = DbRepository;