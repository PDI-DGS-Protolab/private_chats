#!/bin/bash

#Requirements
printf "\n Installing apt-utils \n"
apt-get -y install apt-utils

printf "\n Installing git \n"
apt-get -y install git

printf "\n Installing curl \n"
apt-get -y install curl

printf "\n Installing gcc \n"
apt-get -y install gcc

printf "\n Installing g++ \n"
apt-get -y install g++

printf "\n Installing make \n"
apt-get -y install make

printf "\n Installing python \n"
apt-get -y install python

#Download the code from the github repository
git clone git://github.com/ry/node.git
cd node
./configure
make
make install

#More requeriments (they require node)
curl https://npmjs.org/install.sh | sh

#Install Meteor
echo tlsv1 > $HOME/.curlrc
curl https://install.meteor.com | /bin/sh

#Install Meteorite
npm install -g meteorite 

cd
