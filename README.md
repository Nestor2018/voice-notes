# Voice Recorder App

Este proyecto es una aplicación de grabación de audio que permite a los usuarios grabar, subir y escuchar audios en la nube usando Google Cloud Storage. La aplicación está construida con **React** y **TypeScript**.

## Requisitos previos

Antes de ejecutar la aplicación, asegúrate de tener lo siguiente instalado:

- **Node.js** (versión 16 o superior)
- **npm** (gestor de paquetes de Node.js)

Si no tienes Node.js y npm instalados, puedes descargarlos desde [aquí](https://nodejs.org/).

También necesitarás una cuenta de Google Cloud con un bucket configurado en **Google Cloud Storage** para almacenar los audios.

## Instalación y configuración

### 1. Clona el repositorio

Primero, clona el repositorio del proyecto en tu máquina local:

```bash
git clone https://github.com/tu_usuario/voice-recorder-app.git
```

### 2. Navega a la carpeta del proyecto

```bash
cd voice-recorder-app
```

### Instala las dependencias

```bash
npm install
```

### 4. Configura Google Cloud Storage

En este proyecto ya esta configurado y la **Url firmada** que permite la subida
de archivos yo la genere el día 6 de enero con una duración de 7 días, por lo que
no es necesario que pongan otra para que funcione. Antes de que se cumplan los 7
días actualizare el repositorio con una nueva clave para que es proyecto siga
funcionando. Pero si por alguna razón no guarda los archivos comunicarse conmigo
al correo _<neybluenefa@gmail.com>_ y actualizo el la **Url firmada** para que
funcione.

[!IMPORTANTE]

En el archivo `generateUrl` encontrarás el siguiente fragmento de código:

```javascript
const storage = new Storage({
  keyFilename: path.join(
    __dirname,
    "../assets/voice-notes-447102-8a8516fd6fd5.json",
  ), // Ruta al archivo JSON de la cuenta de servicio
});
```

Este archivo JSON, que contiene las credenciales de la cuenta de servicio de Google Cloud, es necesario para que la aplicación funcione correctamente. Puedes generar este archivo en tu máquina local, y a continuación te proporciono su contenido:

```json
{
  "type": "service_account",
  "project_id": "voice-notes-447102",
  "private_key_id": "8a8516fd6fd55da064c61dba80514ff46899d80c",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDLF/IgwHZNaFx4\nsJFwyVf/upkwlfalz72yeB0ygP3wdZA289kA2JQxg2N5S2ofxiWs/PjpftZWGDo8\nyN+t1M+qGmiPJ2b0pAXRi2T/QkbXvckKYTrhO1yONgparSDWbTHLMHHSCwLJD/4G\nuxBV5ULXRTm39LMetXrFphV4ZYKGi6V+vrmceygLeAZIR5TtWBVTiYqWqf+VWNOD\nZOYxV2BD5D/VlKSLeOkt8rIgHq46A+lb9XRNjpyYqwvACK7um2DliWhwUg1J4Vns\npaNwO4dkJUoz26d0cN6zA1G/MlowaRBXrZmAJsNiq07e2p2QCgT5G2f9tzNm0+Oe\nMQqz9JOVAgMBAAECggEAJvjRXbeQ/AmqtP4s6pe4azpDay9bxTW4ESc7cxWNpTbq\nFaF1YtQsm9O6ouv10WMUl71zhlrwhlTf2Aoz4geUUe//YHkPKKLQ+wTkvJbbQUsJ\n6RP/WHkrqZ51HjFau8r4YyVIsiWqwypudJww5kq4KNb/3Gz4ckwg4wyb0h6ojWin\nMjEH8p2jMmt+JmqB37zBnIj+BEq2F+4kXKNDdk4o4UQxT07oYQ9dBuKleH7K1U9Z\n9Tx9/zXPBt990IdKqd5Th19xKHDUknPsffgmEZUq3mz3hOp2ODSViDPTSYed3VX+\nTqobOcPmdeF8lIsfdPyqwwY+E9cBYlwSRS32rGwsAQKBgQDok4/SZtNdHBgAXRBc\nxA6SgKT23vqsFZn0m/HMfq+je+6PvGEVGOOkh5e+VaZWFKH1heuV0ezGo7jGdaMm\nSKNJo0vCNl3xRncLL1iMlniQvHvEY6FOe1rJjsI0g17Qa9qrDRHvnu+P6Xnq5JCJ\nYM0b16fIorp1nbRI0Dy6CbnZSQKBgQDfjDyzrL9zUha6pLA1/6AepRQ9dl4D+XiY\nVWGCtEAudkTHzaJ3rBMG9yKuMKctZVaRYaHnsKTNjmGQht9xgAFDcBqgNAzsZPPG\nO5QCdYsD73t6YCWaDwOQUlAwLZlpv5eanINcSM5SNz1kLj6ZEVo6j9fqYwa7UKqV\nkV6T35YT7QKBgA8z9ibOyepAN+FuM++ccUdqWV453TD6iIHQ39F6RojtRP7oVYBH\njDnpEyZB+wmNd7jQ9EFq44tokF+IuQ17mhDqN72OSD3JWWbFxYgLHf54E68WxCiZ\nL6oVRuSf4cbGBhlAVXfQb+B8ZpfQMRKJ3V6AjlszJ/UgRfSsiAuxLxDhAoGASKCb\nKBS7ro/A6qqOxTxjnREs3jsSmF/4miVDJN/C6lVqSy+31QGGvQCVt9n+tnTyBxGd\nNFTjdhUIBZiMB6f6wRouzFWczUCPIpxAnfvqSkEH8N5D2SV/lufnPX/TE9Q3QPgQ\nhW7x+SwROfb8R2an1dbd4zyA92JhyW4NOCWv8JECgYEAxEUDgdBp9eRCz6Yhmfx5\nqta8phQM07JP4E6g3maP34QGpKyY8QqoTN0L8jxZ8tsf1RiWd8ry8q62S8PwK2Tv\nYvB6su2v0EoWDR+R1J3k10WJiYwy1RiH6pG1fngwRfasJPH9OouBi+jUl3PIGEXx\nVzw/rBJw6XVjTUWKFLgQrWk=\n-----END PRIVATE KEY-----\n",
  "client_email": "upload-files-voice@voice-notes-447102.iam.gserviceaccount.com",
  "client_id": "116757125894712900521",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/upload-files-voice%40voice-notes-447102.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

Asegúrate de colocar la ruta correcta hacia el archivo JSON en el código anterior. Sin este archivo, las funciones relacionadas con Google Cloud Storage no funcionarán.

### 5. Ejecuta la aplicación

```bash
npm run dev
```

## Uso de la aplicación

### 1. Grabar audio

- Haz clic en el botón _“Grabar audio”_ para empezar a grabar el audio.
- El botón cambiará a _“Detener grabación”_ cuando la grabación esté en progreso.

### 2. Subir el audio

- Una vez que termines de grabar, haz clic en el botón de _“Subir Audio”_ para
  cargar el audio grabado a Google Cloud Storage.
- Verás el progreso de la carga en la interfaz.

### 3. Escuchar y descargar audios

- Los audios subidos aparecerán en una lista. Puedes escuchar cada archivo o descargarlo
  según lo necesites.
