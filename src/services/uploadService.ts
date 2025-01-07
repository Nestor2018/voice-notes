import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";

/**
 * Sube un archivo a Google Cloud Storage (GCS) con seguimiento de progreso.
 *
 * @param {Blob} file - El archivo que se va a subir.
 * @param {function} setUploadProgress - Función para actualizar el progreso de la subida.
 * @param {string} signedUrl - URL firmada proporcionada por GCS para la subida.
 * @returns {Promise<string>} - Una promesa que se resuelve con la URL firmada una vez que el archivo se ha subido.
 */
export const uploadToGCSWithProgress = async (
  file: Blob,
  setUploadProgress: (progress: number) => void,
  signedUrl: string // URL firmada proporcionada por GCS
): Promise<string> => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": file.type, // Puede ser audio/mp3 o el tipo de archivo correcto
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      if (progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(progress);
      } else {
        // Si no podemos obtener el total, podemos calcular el progreso de alguna otra manera
        const progress = progressEvent.loaded ? Math.round((progressEvent.loaded * 100) / 1000000) : 0;
        setUploadProgress(progress);
      }
    },
  };

  try {
    // Usamos PUT en lugar de POST, ya que estamos usando una URL firmada
    const response = await axios.put(signedUrl, file, config);
    return signedUrl; // Devolver la URL firmada ya que el archivo está subido
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
