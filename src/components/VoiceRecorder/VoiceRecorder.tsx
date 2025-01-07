import React, { useEffect, useState } from "react";
import { listAudiosInBucket } from "../../services/listAudiosService.ts";
import { Mic } from "lucide-react";
import AudioList from "../AudioList";
import AudioPlayer from "../AudioPlayer";
import useAudioRecorder from "../../hooks/useAudioRecorder";
import "./VoiceRecorder.scss";

// Componente principal que muestra el boton para grabar , el audio grabado y el audio del Cloud Storage
const VoiceRecorder: React.FC = () => {
  const {
    isRecording,
    volume,
    audioURL,
    uploadProgress,
    handleStartRecording,
    handleStopRecording,
    handleUploadAudio,
    downloadAudio
  } = useAudioRecorder();

  const [audiosInCloud, setAudiosInCloud] = useState<string[]>([]);
  const bucketName = "bucket-voice-notes";

  useEffect(() => {
    const fetchAudios = async () => {
      const files = await listAudiosInBucket(bucketName);
      setAudiosInCloud(files);
    };
    fetchAudios();
  }, []);

  return (
    <div>
      <button onClick={isRecording ? handleStopRecording : handleStartRecording} className="record-button">
        <Mic
          className={`mic-icon ${isRecording ? 'recording' : ''}`}
          style={{
            transform: isRecording ? `scale(${1 + volume / 200})` : 'scale(1)'
          }}
        />
        {isRecording ? "Detener grabación" : "Grabar audio"}
      </button>
      {audioURL && (
        <AudioPlayer
          audioURL={audioURL}
          onUpload={handleUploadAudio}
          uploadProgress={uploadProgress}
        />
      )}
      <AudioList audios={audiosInCloud} onDownload={downloadAudio} />
    </div>
  );
};

export default VoiceRecorder;

