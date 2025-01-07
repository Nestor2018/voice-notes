import { useState, useRef, useEffect } from "react";
import { startRecording, stopRecording, uploadAudio, downloadAudio } from "../services/audioUtils";

/**
 *  Grabar audio.
 * 
 * @returns {Object} - Retorna un objeto con el estado y las funciones para manejar la grabación de audio.
 */
const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false); // Estado para indicar si se está grabando
  const [volume, setVolume] = useState<number>(0); // Estado para el volumen del audio
  const [audioURL, setAudioURL] = useState<string | null>(null); // URL del audio grabado
  const [uploadProgress, setUploadProgress] = useState<number>(0); // Progreso de la subida del audio
  const [cloudAudioURL, setCloudAudioURL] = useState<string | null>(null); // URL del audio subido a la nube
  const audioContext = useRef<AudioContext | null>(null); // Contexto de audio
  const analyser = useRef<AnalyserNode | null>(null); // Nodo de análisis de audio
  const dataArray = useRef<Uint8Array | null>(null); // Array de datos de audio
  const animationFrame = useRef<number>(); // Frame de animación
  const mediaRecorder = useRef<MediaRecorder | null>(null); // Grabador de medios
  const audioChunks = useRef<Blob[]>([]); // Fragmentos de audio grabado
  const bucketName = "bucket-voice-notes"; // Nombre del bucket para subir el audio

  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current); // Cancelar la animación al desmontar el componente
      }
    };
  }, []);

  /**
   * Inicia la grabación de audio.
   */
  const handleStartRecording = () => {
    startRecording(setIsRecording, setVolume, setAudioURL, audioContext, analyser, dataArray, animationFrame, mediaRecorder, audioChunks);
  };

  /**
   * Detiene la grabación de audio.
   */
  const handleStopRecording = () => {
    stopRecording(setIsRecording, setVolume, animationFrame, mediaRecorder);
  };

  /**
   * Sube el audio grabado a la nube.
   */
  const handleUploadAudio = () => {
    uploadAudio(audioURL, audioChunks, setUploadProgress, setCloudAudioURL, bucketName);
  };

  return {
    isRecording,
    volume,
    audioURL,
    uploadProgress,
    cloudAudioURL,
    handleStartRecording,
    handleStopRecording,
    handleUploadAudio,
    downloadAudio
  };
};

export default useAudioRecorder;
