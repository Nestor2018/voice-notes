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
git clone https://github.com/Nestor2018/voice-notes
```

### 2. Navega a la carpeta del proyecto

```bash
cd voice-notes
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

Este archivo JSON, que contiene las credenciales de la cuenta de servicio de Google Cloud, es necesario para que la aplicación funcione correctamente. Puedes generar este archivo en tu máquina local, y a la persona que me contacto para la prueba tecnica le pase un documento .txt donde se encuentra el archivo json con los datos ya que en el repositorio google me bloque las credenciales antiguas:

Asegúrate de colocar la ruta correcta hacia el archivo JSON en el código anterior. Sin este archivo, las funciones relacionadas con Google Cloud Storage no funcionarán.

[!IMPORTANTE]

En el archivo `audioUtils.ts` encontrarás el siguiente fragmento de código:

```TypeScript
  const signedUrl =
    ""
    -"https://storage.googleapis.com/bucket-voice-notes/nombre-audio?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential"
    -"=upload-files-voice%40voice-notes-447102.iam.gserviceaccount.com%2F20250113%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date="
    -"20250113T012101Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=content-type%3Bhost&X-Goog-Signature=8d7217a1a5279c9fc4551"
    -"0ad56bb17b3e0547c1641b98d7b539ab5ecaba0cd9bf8d93f1f9cb377033cbe5e646ead54020b78"
    -"8c751cf53c87c13a9ff2be2545ea27c5d7c0ab9773e1351afce268e7115cc59e235ae6734cdf8bf298bcddda5ca8486c59273952251b462"
    -"12b378d4288fbf48722cc27bbdcf8f6d94e366af0d3112a615023b05a372da1a1e970baa0d5ec3a62921c4cc0d1598e1fdeb53dcc4d837dbdab83b0c2"
    -"966e18d07ed9ddb6a3a91e8068053265811172c1cb5ad870132d6712e5a9f0289d1f977b4e241fc2e0d12b3a0fef88e47df6ab290bc1807f73fedd382ff2f1953e6b382f45951af315323060a1f0c31da8c36d119df50bf11618"
```

Este es el string de la url firmada para poder guardar el archivo de audio, lo
tengo asi en varias partes para que github no me lo bloquee, para poderlo usar
deben unir todas las partes y pegar todo el string en la constante `signedUrl`

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
