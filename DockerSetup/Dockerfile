FROM 54.194.12.115:5000/meteor

MAINTAINER inLab uLab BCN team inlab-ulab@fib.upc.edu

ADD install_auth_server.sh install_auth_server.sh
RUN chmod +x install_auth_server.sh
RUN ./install_auth_server.sh
RUN rm install_auth_server.sh

ADD execute.sh execute.sh
RUN chmod +x execute.sh

ENTRYPOINT ./execute.sh
