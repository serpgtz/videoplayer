import React from 'react';
import { Video } from './video';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import './VideoItem.css';
import * as videoService from './videoService';

interface Props {
  video: Video;
  loadVideo: () => void;
  isPlaying: boolean; // Tipo booleano para saber si el video está en reproducción
  onPlay: () => void; // Función para manejar la reproducción
}

const VideoItem = ({ video, loadVideo, isPlaying, onPlay }: Props) => {
  const navigate = useNavigate();

  const handleDelete = async (id: string | undefined) => {
    if (id) {
      await videoService.deleteVideo(id);
      loadVideo();
    }
  };

  return (
    <div className='col-md-4 mt-3'>
      <div className="card card-body video-card">
        <div className="d-flex justify-content-between">
          <h1 onClick={() => navigate(`/update/${video.id}`)}>{video.title}</h1>
          <span className='text-danger' onClick={() => video.id && handleDelete(video.id)}>x</span>
        </div>
        <p>{video.descripcion}</p>
        <div className="embed-responsive embed-responsive-16by9 video-card">
          <ReactPlayer
            url={video.url}
            width="100%"
            height="100%"
            playing={isPlaying} // Corregir la sintaxis de JSX
            controls
            onPlay={onPlay} // Asegurar que la función onPlay se llama al reproducir el video
          />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
