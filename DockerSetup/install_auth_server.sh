#!/bin/bash

# Download the code from the Github repository.
git clone https://github.com/PDI-DGS-Protolab/private_chats.git auth_server
cd auth_server
git checkout master_authServer
git pull

# Updating the project dependencies.
mrt add iron-router
mrt add http
mrt add accounts-password

cd

# Fixing the source code of meteor in order to avoid crashes.
sed -i '452s/.*/files.rm_recursive(toDir);/' /.meteor/tools/09b63f1ed5/tools/files.js
sed -i '450s/.*/var movedOldDir = false;/' /.meteor/tools/09b63f1ed5/tools/files.js
