FROM ubuntu:latest

MAINTAINER inLab uLab BCN team inlab-ulab@fib.upc.edu

#Adding the script which performs the installation of meteor.
ADD install_meteor.sh install_meteor.sh

#Giving permissions in order to execute the script.
RUN chmod +x install_meteor.sh

#Executing the script.
RUN ./install_meteor.sh
