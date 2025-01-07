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
no es necesario que pongan otra para que funcione. antes de que se cumplan los 7
días actualizare el repositorio con una nueva clave para que es proyecto siga
funcionando. Pero si por alguna razón no guarda los archivos comunicarse conmigo
al correo _<neybluenefa@gmail.com>_ y actualizo el la **Url firmada** para que
funcione.

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
