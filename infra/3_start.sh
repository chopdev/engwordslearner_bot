#!/usr/bin/env bash

# send webhook url and public key pem for telegram
node ../bot_server/setWebhook.js

# start deamon server process
forever start ../bot_server/index.js