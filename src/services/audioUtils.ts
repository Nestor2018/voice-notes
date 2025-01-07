import axios from "axios";
import { uploadToGCSWithProgress } from "./uploadService";

// Función para iniciar la grabación de audio
export const startRecording = async (
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>,
  setVolume: React.Dispatch<React.SetStateAction<number>>,
  setAudioURL: React.Dispatch<React.SetStateAction<string | null>>,
  audioContext: React.MutableRefObject<AudioContext | null>,
  analyser: React.MutableRefObject<AnalyserNode | null>,
  dataArray: React.MutableRefObject<Uint8Array | null>,
  animationFrame: React.MutableRefObject<number | undefined>,
  mediaRecorder: React.MutableRefObject<MediaRecorder | null>,
  audioChunks: React.MutableRefObject<Blob[]>
) => {
  // Solicita acceso al micrófono del usuario
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder.current = new MediaRecorder(stream);

  // Configura el contexto de audio y el analizador
  audioContext.current = new AudioContext();
  analyser.current = audioContext.current.createAnalyser();
  const source = audioContext.current.createMediaStreamSource(stream);
  source.connect(analyser.current);
  analyser.current.fftSize = 256;
  const bufferLength = analyser.current.frequencyBinCount;
  dataArray.current = new Uint8Array(bufferLength);

  // Función para actualizar el volumen del audio
  const updateVolume = () => {
    if (analyser.current && dataArray.current) {
      analyser.current.getByteFrequencyData(dataArray.current);
      const average = dataArray.current.reduce((a, b) => a + b) / dataArray.current.length;
      setVolume(average);
      animationFrame.current = requestAnimationFrame(updateVolume);
    }
  };
  updateVolume();

  // Almacena los datos de audio grabados
  mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
    audioChunks.current.push(event.data);
  };

  // Cuando se detiene la grabación, crea una URL para el audio grabado
  mediaRecorder.current.onstop = () => {
    const blob = new Blob(audioChunks.current, { type: "audio/mp3" });
    setAudioURL(URL.createObjectURL(blob));
  };

  // Inicia la grabación
  mediaRecorder.current.start();
  setIsRecording(true);
};

// Función para detener la grabación de audio
export const stopRecording = (
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>,
  setVolume: React.Dispatch<React.SetStateAction<number>>,
  animationFrame: React.MutableRefObject<number | undefined>,
  mediaRecorder: React.MutableRefObject<MediaRecorder | null>
) => {
  if (animationFrame.current) {
    cancelAnimationFrame(animationFrame.current);
  }
  mediaRecorder.current?.stop();
  setIsRecording(false);
  setVolume(0);
};

// Función para subir el audio grabado a Google Cloud Storage
export const uploadAudio = async (
  audioURL: string | null,
  audioChunks: React.MutableRefObject<Blob[]>,
  setUploadProgress: React.Dispatch<React.SetStateAction<number>>,
  setCloudAudioURL: React.Dispatch<React.SetStateAction<string | null>>,
  bucketName: string
) => {
  if (!audioURL) return;

  const blob = new Blob(audioChunks.current, { type: "audio/mp3" });

  const signedUrl =
    "https://storage.googleapis.com/bucket-voice-notes/nombre-audio?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=upload-files-voice%40voice-notes-447102.iam.gserviceaccount.com%2F20250107%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250107T063340Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=content-type%3Bhost&X-Goog-Signature=c0c31248456bc69eac0d29037ec622b170b8b4ba015e93ec4b46e8bc56ff33cbd1b98a10be20a5b7bae7f8d3cc9dc24e0d701c09720a51466ea28aa79f109425b5e35569b6bbd14c999be25cd3fdc70f97196e70ef599b490803129ce9c684975e4f2e4d56550686806aad5f92327cd29734f66b64e78e0d58f3dc0fb25ad21b51393a9cde97faa6b5a90423ff8b806c9da25dbe396234a64ad6820a2f7955ff6388474bd7a4da9dcbc2c63012ce5d963b5c35f4961ad61d7138eb85417b157b5fb1011be7dde2d09ecb09f7e776d7f5a72dffb188cecc4e9f70e88e0c7696ff8d04f58256758a4917fb3531c138db9cb4a21437466a3c7373cb7021dc656f28";

  try {
    const response = await uploadToGCSWithProgress(blob, setUploadProgress, signedUrl);
    if (response) {
      const audioFileUrl = `https://storage.googleapis.com/${bucketName}/nombre-audio`;
      setCloudAudioURL(audioFileUrl);
      alert("Archivo subido con éxito");
    } else {
      alert("Error al subir el archivo");
    }
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Error al subir el archivo catch");
  }
};

// Función para descargar el audio desde una URL
export const downloadAudio = async (url: string) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob'
    });

    const fileName = url.split('/').pop() || 'audio.mp3';
    const blob = new Blob([response.data], { type: 'audio/mp3' });
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Error al descargar el audio:", error);
    alert("Error al descargar el archivo");
  }
};
