const config = require("../config/configData");
const AWS = require('aws-sdk');
const { Word } = require("../models/wordEntity");
const { getWordsFromFile } = require("../parser/parser");

class DbRepository {

    constructor() {
        AWS.config.getCredentials(err => {
            if (err) console.error("Failed to get aws credentials", err);
        });
        AWS.config.update({region: "us-east-1"});
        this.ddbClient = new AWS.DynamoDB();
    }

    async init() {
        this.keys = await this.getAllKeys();

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

    async getRandomWord() {
        const rand = Math.round(Math.random() * (this.keys.length - 1));
        return this.getWordForKey(this.keys[rand]);
    }

    async getAllKeys() {
        let lastEvalKey = null;
        let keys = [];
        try {
            do {
                const requestParams = {
                    TableName: config.aws.tableName,
                    ProjectionExpression: "word",
                    ExclusiveStartKey: lastEvalKey
                };

                const res = await this.ddbClient.scan(requestParams).promise();
                lastEvalKey = res.LastEvaluatedKey;

                for (const item of res.Items) {
                    const wordObj = AWS.DynamoDB.Converter.unmarshall(item);
                    keys.push(wordObj.word);
                }
            } while(lastEvalKey != null)
        } catch (ex) {
            console.error("Failed to retrieve keys from DDB", ex)
            throw ex;
        }
        return keys;
    }

    async getWordForKey(eng) {
        try {
            const requestParams = {
                TableName: config.aws.tableName,
                Key: {
                    'word': {S: eng}
                },
            };
    
            const res = await this.ddbClient.getItem(requestParams).promise();
            if (res == null || res.Item == null) {
                throw new Error(`Failed to find key in ddb: ${eng}`)
            }
            const flat = AWS.DynamoDB.Converter.unmarshall(res.Item);
            return new Word(flat.word, flat.translations, flat.examples);
        } catch (ex) {
            console.error("Failed to retrieve word from DDB", eng, ex)
            throw ex;
        }
    }

    async saveWord(word, userId) {
        try {
            const date = new Date();
            const entity = AWS.DynamoDB.Converter.marshall({
                word: word.eng,
                translations: word._translations,
                examples: word._examples,
                userId: userId + "",
                date: date.toISOString()
            });

            const requestParams = {
                TableName: config.aws.tableName,
                Item: entity
            };
    
            await this.ddbClient.putItem(requestParams).promise();

        } catch (ex) {
            console.error("Failed to save word to DDB", word, userId, ex)
        }
    }

}

exports.DbRepository = DbRepository;