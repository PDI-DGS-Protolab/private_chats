FROM 54.194.12.115:5000/meteor

MAINTAINER inLab uLab BCN team inlab-ulab@fib.upc.edu

#Adding the script which performs the installation of the auth server.
ADD install_auth_server.sh install_auth_server.sh

#Giving permissions in order to execute the script.
RUN chmod +x install_auth_server.sh

#Executing the script.
RUN ./install_auth_server.sh

#Removing the script once used.
RUN rm install_auth_server.sh

#Adding the script that will be executed every time the image is run.
ADD execute.sh execute.sh

#Giving permissions in order to execute the script.
RUN chmod +x execute.sh

#Defining the script to be executed when the image is run.
ENTRYPOINT ./execute.sh
