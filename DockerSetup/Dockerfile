FROM 54.194.12.115:5000/meteor

MAINTAINER inLab uLab BCN team inlab-ulab@fib.upc.edu

ADD install_chat_server.sh install_chat_server.sh
RUN chmod +x install_chat_server.sh
RUN ./install_chat_server.sh
RUN rm install_chat_server.sh
RUN export $AUTH_ENDPOINT

ADD execute.sh execute.sh
RUN chmod +x execute.sh

ENTRYPOINT ./execute.sh
