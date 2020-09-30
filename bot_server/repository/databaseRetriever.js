const config = require("../config/configData");
const AWS = require('aws-sdk');
const { Word } = require("../models/wordEntity");

class DbRepository {

    constructor() {
        AWS.config.getCredentials(err => {
            if (err) console.error("Failed to get aws credentials", err);
        });
        AWS.config.update({region: config.aws.region});
        this.ddbClient = new AWS.DynamoDB();
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
            return new Word(flat.word, flat.translations, flat.examples, flat.synonyms);
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
                synonyms: word._synonyms,
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