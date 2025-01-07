import React from "react";

import UploadProgress from "../UploadProgress";
import './AudioPlayer.scss'

interface AudioPlayerProps {
  audioURL: string;
  onUpload: () => void;
  uploadProgress: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioURL, onUpload, uploadProgress }) => {
  return (
    <div className="audio-player-container">
      <audio controls>
        <source src={audioURL} type="audio/mp3" />
      </audio>
      <button onClick={onUpload}>Subir Audio</button>
      <div className="upload-progress-container">
        <UploadProgress progress={uploadProgress} />
      </div>
    </div>
  );
};

export default AudioPlayer;

