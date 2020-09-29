#!/usr/bin/env bash

read -p "Enter ec2 public DNS: " domain

# config folder should contain "ENG_BOT_PRIVATE.key ENG_BOT_PUBLIC.pem configData.js"
# http://www.hypexr.org/linux_scp_help.php

# generate self-signed certificate
# https://core.telegram.org/bots/self-signed
openssl req -newkey rsa:2048 -sha256 -nodes -keyout ENG_BOT_PRIVATE.key -x509 -days 365 -out ENG_BOT_PUBLIC.pem -subj "/C=CA/ST=Vancouver/L=Center/O=Eng words bot/CN=${domain}"

# place certs in config folder
mv ENG_BOT_PRIVATE.key ENG_BOT_PUBLIC.pem ../bot_server/config/