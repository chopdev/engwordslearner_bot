const config = require("../config/configData");
const { Word } = require("../models/wordEntity");


class DbRepository {

    constructor() {
        this.words = [
            new Word("staffing", "набор персонала"),
            new Word("errand", "поручение", "I’m stepping out to run some errands"),
            new Word("withhold", "умалчивать, скрывать", ['Has the government been withholding crucial information?',
                'The client’s name and address have been withheld for security reasons.']),
            new Word("exempt", "освобождать", ['goods exempt from this tax include books and children’s closes', 
                'Pregnant women are exempt from dental charges by the law.'])
        ];
    }

    getAllUsers() {
        return [config.user_id];
    }

    getRandomWord() {
        const rand = Math.floor(Math.random() * (this.words.length - 1));
        return this.words[rand];
    }
}

exports.DbRepository = DbRepository;