## EngWordsLearner telegram bot

Russian-English vocabulary exercise bot integrated with Telegram (https://core.telegram.org/bots/api). 
Words can be uploaded from excel files downloaded from https://translate.google.com/.

#### Structure
* ```infra``` package contains cloudformation scripts to bootstrap AWS infrastructure
* ```bot_server``` package contains source code of the bot

#### How to build
 * Source package should contain ```config/configData.js``` file with configurations
```
// AWS Api Gateway url that triggers Lambda bot
exports.service_url = "...";
// SQS queue ARN, contains list of words to suggest
exports.sqs_url = "...";
// Token that is used to query telegram servers https://core.telegram.org/bots/api
exports.token = "...";
// Admin user chat id
exports.user_id = "...";
// AWS DDB table name and region
exports.aws = {
    tableName: "...",
    region: "..."
};
```
 * Build of the bundles is done by ```webpack```
```package.json``` "scripts" contains commands to create ```.zip``` deployment packages of lambdas which are placed in ```dist``` folder

```
npm run build  // builds main telegram bot lambda zip
npm run build-update-queue // builds reload SQS queue lambda zip
````

* ```setWebhook.js``` is used to set Telegram web hook 