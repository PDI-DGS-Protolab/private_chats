Private Chats - Master chatServer
=================================
Master branch of the Chats Server. It contains Docker files to auto-deploy the project.
For more information see the guide: http://goo.gl/C3mSHr
### Info in the guide about this server:
	1.3.2 SERVIDOR DE CHATS

	# Descargar el código del repositorio de github.
	# Esta parte está adaptada a como está estructurado el repositorio a día de 13/01/2013
		> git clone https://github.com/PDI-DGS-Protolab/private_chats.git
		> cd private_chats
		> git checkout master_chatServer
		> git pull
	
		# Actualizar las dependencias del proyecto
		> mrt add iron-router 
	> mrt add http

	# Remplazar en el fichero settings.json la variable AUTH_ENDPOINT por la URL del authServer con el formato: “http://” + @IP o URL (sin “/” ni “/check” al final), por ejemplo http://authserver2.meteor.com o http://147.83.53.118:5000

	# Correr el servidor, por defecto corre en el puerto 3000.
	# Con --port podemos especificar el número del puerto donde va a correr el servidor
	# Con --settings especificamos el fichero de configuración que queremos utilizar
		> mrt --port=5000 --settings=settings.json

