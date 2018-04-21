#!/usr/bin/bash

#This is tested on a new installation, and includes creating a user on a fresh Digital Ocean Centos7.4 Droplet. Modify it accordingly. Something more generic will be done later.

user_name="$1"
project_name="$2"

yum update -y
yum install git -y
yum install vim -y

#User, Folder, Permissions
adduser ${user_name}
project_folder="/www/${project_name}"
mkdir -p /www/${project_name}
chmod -R 755 /www/${project_name}
chown -R ${user_name}:${user_name} /www/${project_name}

#nvm, node, npm
cd ${project_folder}
su ${user_name}
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
source ~/.bashrc
nvm install node
#nvm install node
#nvm use node
#export NVM_DIR="$HOME/.nvm"

#setup project
npm init -y
npm install spinec --save
npm install spinec --global
wget --output-document=index.html https://ipfs.io/ipfs/QmWckGtnq3dnFWuJUqqwPQ7HWH28SA31RWN7VZREGStgFR
mkdir src
cd src
git clone https://github.com/musicsmithnz/polymer_web_components.git 
