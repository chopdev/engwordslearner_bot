const config = require("../config/configData");
const { Word } = require("../models/wordEntity");


class DbRepository {

    constructor() {
        let words = [
            new Word("staffing", "набор персонала"),
            new Word("errand", "поручение", "I’m stepping out to run some errands"),
            new Word("withhold", "умалчивать, скрывать", ['Has the government been withholding crucial information?',
                'The client’s name and address have been withheld for security reasons.']),
            new Word("exempt", "освобождать", ['goods exempt from this tax include books and children’s closes', 
                'Pregnant women are exempt from dental charges by the law.'])
        ];

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