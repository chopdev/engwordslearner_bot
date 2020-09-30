
const config = require("../config/configData");
const AWS = require('aws-sdk');
const { Word } = require("../models/wordEntity");

/* 
* SQS words queue
*/
class QueueRepository { 

    constructor() {
        AWS.config.getCredentials(err => {
            if (err) console.error("Failed to get aws credentials", err);
        });
        AWS.config.update({region: config.aws.region});
        this.sqsClient = new AWS.SQS();
    }

    /* 
     *  Clears queue & fills it with the new keys
    */
    async backfillQueue(keys) {
        await this.sqsClient.purgeQueue({QueueUrl: config.sqs_url}).promise();

        for (let key of keys) {
            await this.addWord(key);
        }
    }

    /* 
     *  Add word's eng key to the queue
    */
    async addWord(wordKey) {
        const params = {
            MessageBody: wordKey,
            QueueUrl: config.sqs_url
          };
 
         await this.sqsClient.sendMessage(params).promise();
    }

    /* 
     *  Get word's eng key & remove it from the queue
    */
    async getNextWord() {
        var params = {
            QueueUrl: config.sqs_url,
            MaxNumberOfMessages: '1',
        };

        let response = await this.sqsClient.receiveMessage(params).promise();

        if (!response.Messages) {
            return null;
        }

        var deleteParams = {
            QueueUrl: config.sqs_url,
            ReceiptHandle: response.Messages[0].ReceiptHandle
        };
              
        await this.sqsClient.deleteMessage(deleteParams).promise();
        
        return response.Messages[0].Body;
    }
}

exports.QueueRepository = QueueRepository;