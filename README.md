Private Chats - Master authServer
=================================
Master branch of the Authentication Server.

For more information see the guide: http://goo.gl/C3mSHr
Info in the guide about this server:
--------------------------------------------------------
1.3.1 SERVIDOR DE AUTENTICACIÓN

# Descargar el código del repositorio de github.
# Esta parte está adaptada a como está estructurado el repositorio a día de 13/01/2013
	> git clone https://github.com/PDI-DGS-Protolab/private_chats.git
	> cd private_chats
	> git checkout master_authServer
	> git pull
	
	# Actualizar las dependencias del proyecto
	> mrt add iron-router
	> mrt add http
	> mrt add accounts-password

# Correr el servidor, por defecto corre en el puerto 3000.
# Con --port podemos especificar el número del puerto donde va a correr el servidor
	> mrt --port=7000
--------------------------------------------------------
