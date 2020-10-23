
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
 
        return this.sqsClient.sendMessage(params).promise();
    }

    /* 
     *  Gets one SQS message
    */
    async getOneMessage() {
        const params = {
            QueueUrl: config.sqs_url,
            MaxNumberOfMessages: '1',
            VisibilityTimeout: 40
        };

        let response = await this.sqsClient.receiveMessage(params).promise();

        if (!response.Messages || !response.Messages[0]) {
            throw new Error(`[ERROR] Failed to receive next message`)
        }

        return response.Messages[0];
    }

     /* 
     *  Delete message with specific "ReceiptHandle"
    */
   async deleteMessage(receiptHandle) {
        var deleteParams = {
            QueueUrl: config.sqs_url,
            ReceiptHandle: receiptHandle
        };
            
        return this.sqsClient.deleteMessage(deleteParams).promise();
    }

    /* 
     *  Get word's eng key & re-add it to the queue
    */
    async getNextWord() {
        try {
            const msg = await this.getOneMessage();
            await this.deleteMessage(msg.ReceiptHandle);
            await this.addWord(msg.Body);
            return msg.Body;
        } catch(ex) {
            console.error(`[ERROR] Failed to get next word. ${ex}`);
        }
    }
}

exports.QueueRepository = QueueRepository;