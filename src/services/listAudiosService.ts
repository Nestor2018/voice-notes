import axios from "axios";

/**
 * Lista los archivos de audio en un bucket de Google Cloud Storage.
 * 
 * @param {string} bucketName - El nombre del bucket de Google Cloud Storage.
 * @returns {Promise<string[]>} - Una promesa que resuelve con una lista de URLs públicas de los archivos de audio en el bucket.
 */
export const listAudiosInBucket = async (bucketName: string): Promise<string[]> => {
  const apiKey = "AIzaSyC2SohKx0j4mkWFVYve2yFJ_Yd29Pj_pp4";
  const apiUrl = `https://storage.googleapis.com/storage/v1/b/${bucketName}/o?key=${apiKey}`;
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Extraemos los nombres y generamos las URLs públicas
    const files = data.items.map((item: any) => {
      return `https://storage.googleapis.com/${bucketName}/${item.name}`;
    });

    return files;
  } catch (error) {
    console.error("error fetching audio files:", error);
    return [];
  }
};

