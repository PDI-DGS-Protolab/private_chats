#!/bin/bash
cd chat_server

# Setting the configuration file in order to execute meteor.
printf "{\n\t\"public\" : {\n\t\"endpoint\" : $AUTH_ENDPOINT\n\t}\n}" > settings.json

# Executing meteor.
mrt --settings settings.json
