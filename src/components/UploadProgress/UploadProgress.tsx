import './UploadProgress.scss'

type UploadProgressProps = {
  progress: number;
};

// Barra de progreso
const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => (
  <div>
    <progress value={progress} max="100" />
    <span>{progress}%</span>
  </div>
);

export default UploadProgress;
