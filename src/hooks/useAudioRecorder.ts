import { useState, useRef, useEffect } from "react";
import { startRecording, stopRecording, uploadAudio, downloadAudio } from "../services/audioUtils";

/**
 * Hook personalizado para grabar audio.
 * 
 * @returns {Object} - Retorna un objeto con el estado de la grabación y funciones para manejar la grabación y carga de audio.
 */
const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [cloudAudioURL, setCloudAudioURL] = useState<string | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const dataArray = useRef<Uint8Array | null>(null);
  const animationFrame = useRef<number>();
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const bucketName = "bucket-voice-notes";

  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  /**
   * Inicia la grabación de audio.
   */
  const handleStartRecording = () => {
    setAudioURL(null);
    setUploadProgress(0);
    setCloudAudioURL(null);
    audioChunks.current = [];

    startRecording(
      setIsRecording,
      setVolume,
      setAudioURL,
      audioContext,
      analyser,
      dataArray,
      animationFrame,
      mediaRecorder,
      audioChunks
    );
  };

  /**
   * Detiene la grabación de audio.
   */
  const handleStopRecording = () => {
    stopRecording(
      setIsRecording,
      setVolume,
      animationFrame,
      mediaRecorder
    );
  };

  /**
   * Sube el audio grabado a la nube.
   */
  const handleUploadAudio = async () => {
    if (!audioChunks.current.length) {
      console.error("No hay audio grabado para subir.");
      return;
    }
    await uploadAudio(audioURL, audioChunks, setUploadProgress, setCloudAudioURL, bucketName);
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
