#!/bin/bash
cd chat_server

printf "{\n\t\"public\" : {\n\t\"endpoint\" : $AUTH_ENDPOINT\n\t}\n}" > settings.json

mrt --settings settings.json
