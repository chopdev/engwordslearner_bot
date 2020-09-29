#!/usr/bin/env bash

# install git
sudo yum update -y
sudo yum install git -y
git clone https://github.com/chopdev/engwordslearner_bot.git

# install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
node -e "console.log('Running Node.js ' + process.version)"

# install 'forever' to run as a deamon
# https://stackoverflow.com/questions/4903570/how-does-one-start-a-node-js-server-as-a-daemon-process
curl https://npmjs.org/install.sh | sh
npm install -g forever

# setup project node_modules
cd engwordslearner_bot/bot_server/
npm i