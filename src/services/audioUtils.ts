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
    ""

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
