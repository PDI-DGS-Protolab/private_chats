#!/bin/bash

# Descargar el código del repositorio de github.
git clone https://github.com/PDI-DGS-Protolab/private_chats.git chat_server
cd chat_server
git checkout master_chatServer
git pull

# Actualizar las dependencias del proyecto
mrt add iron-router
mrt add http

cd

#Quickfix
sed -i '452s/.*/files.rm_recursive(toDir);/' /.meteor/tools/0b2f28e18b/tools/files.js
sed -i '450s/.*/var movedOldDir = false;/' /.meteor/tools/0b2f28e18b/tools/files.js
