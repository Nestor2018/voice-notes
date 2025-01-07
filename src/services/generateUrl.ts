import { Storage } from '@google-cloud/storage';
import path from 'path';

// Crea un cliente de Google Cloud Storage
const storage = new Storage({
  keyFilename: path.join(__dirname, '../assets/voice-notes-447102-8a8516fd6fd5.json'), // Ruta al archivo JSON de la cuenta de servicio
});

const bucketName = 'bucket-voice-notes';  // Nombre de tu bucket de Google Cloud Storage
const fileName = 'prueba.mp3';  // El nombre del archivo que deseas cargar
const expirationTime = Date.now() + 3600 * 1000;  // Tiempo de expiración en milisegundos (1 hora)

// Generar la URL firmada
async function generateSignedUrl() {
  const options = {
    version: 'v4',
    action: 'write',  // Acción 'write' para permitir la carga de archivos
    expires: expirationTime,  // Fecha de expiración de la URL
    contentType: 'audio/mp3',  // Tipo de contenido que se está subiendo
  };

  // Obtener una referencia al archivo en el bucket
  const file = storage.bucket(bucketName).file(fileName);

  // Generar la URL firmada
  try {
    const [url] = await file.getSignedUrl(options);
    return url;
  } catch (error) {
    console.error('Error al generar la URL firmada:', error);
  }
}

generateSignedUrl();
