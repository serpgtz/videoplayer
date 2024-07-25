import React, { useEffect, useState } from 'react';
import * as videoService from './videoService';
import { Video } from './video';
import VideoItem from './VideoItem';

const VideosList = () => {
  type ErrorWork = {
    message: string;
  };

  const [videos, setVideos] = useState<Video[]>([]);
  const [errorNetwork, setErrorNetwork] = useState<ErrorWork | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | undefined>(undefined); // ID del video en reproducción

  const loadVideos = async () => {
    try {
      const res = await videoService.getVideos();
      if (!res.data.length) throw new Error('Falla en Servidor');
      setVideos(res.data);
    } catch (error) {
      if (error instanceof Error) {
        setErrorNetwork({ message: error.message });
      } else {
        setErrorNetwork({ message: 'Unknown error occurred' });
      }
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handlePlay = (id: string | undefined) => {
    setPlayingVideoId(id);
  };

  return (
    <div className='row'>
      {errorNetwork && <p> {errorNetwork.message}</p>}
      {videos?.map((video) => (
        <VideoItem 
          key={video.id} 
          video={video} 
          loadVideo={loadVideos} 
          isPlaying={playingVideoId === video.id} 
          onPlay={() => handlePlay(video.id)} 
        />
      ))}
    </div>
  );
};

export default VideosList;
