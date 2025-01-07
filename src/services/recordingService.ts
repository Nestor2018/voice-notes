/**
 * Inicia la grabación de audio utilizando la API de MediaDevices.
 * @returns {Promise<MediaRecorder>} - Un MediaRecorder que está grabando el audio.
 */
export const startAudioRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();
  return mediaRecorder;
};

/**
 * Detiene la grabación de audio y devuelve un Blob con los datos de audio grabados.
 * @param {MediaRecorder} mediaRecorder - El MediaRecorder que está grabando el audio.
 * @returns {Promise<Blob>} - Un Blob que contiene los datos de audio grabados en formato MP3.
 */
export const stopAudioRecording = async (mediaRecorder: MediaRecorder) => {
  const audioChunks: Blob[] = [];
  return new Promise<Blob>((resolve) => {
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/mp3" });
      resolve(blob);
    };
    mediaRecorder.stop();
  });
};

/**
 * Devuelve un Blob con los datos de audio grabados sin detener el MediaRecorder.
 * @param {MediaRecorder} mediaRecorder - El MediaRecorder que está grabando el audio.
 * @returns {Promise<Blob>} - Un Blob que contiene los datos de audio grabados en formato MP3.
 */
export const getAudioBlob = (mediaRecorder: MediaRecorder) => {
  return new Promise<Blob>((resolve) => {
    const audioChunks: Blob[] = [];
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/mp3" });
      resolve(blob);
    };
  });
};

