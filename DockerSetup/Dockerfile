FROM 54.194.12.115:5000/meteor

MAINTAINER inLab uLab BCN team inlab-ulab@fib.upc.edu

#Adding the script which performs the installation of the chat server.
ADD install_chat_server.sh install_chat_server.sh

#Giving permissions in order to execute the script.
RUN chmod +x install_chat_server.sh

#Executing the script.
RUN ./install_chat_server.sh

#Removing the script once used.
RUN rm install_chat_server.sh

#Adding the script that will be executed every time the image is run.
ADD execute.sh execute.sh

#Giving permissions in order to execute the script.
RUN chmod +x execute.sh

#Defining the script to be executed when the image is run.
ENTRYPOINT ./execute.sh
