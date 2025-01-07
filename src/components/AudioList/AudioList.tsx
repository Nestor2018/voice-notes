import React from "react";

import './AudioList.scss'

interface AudioListProps {
  audios: string[];
  onDownload: (url: string) => void;
}

//Lista los audios que hay en Cloud Storage
const AudioList: React.FC<AudioListProps> = ({ audios, onDownload }) => {
  return (
    <div className="audio-list-container">
      <h2>Audios en la Nube</h2>
      {audios.length > 0 ? (
        audios.map((audio, index) => (
          <div className="audio-item" key={index}>
            <audio controls>
              <source src={audio} type="audio/mp3" />
            </audio>
            <button onClick={() => onDownload(audio)}>Descargar</button>
          </div>
        ))
      ) : (
        <p>No hay audios disponibles en la nube.</p>
      )}
    </div>
  );
};

export default AudioList;
