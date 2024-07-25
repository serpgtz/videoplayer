import React, { useEffect, useState } from 'react';
import * as videoService from './videoService';
import { Video } from './video';
import VideoItem from './VideoItem';

interface VideosListProps {
  searchQuery: string;
}

const VideosList: React.FC<VideosListProps> = ({ searchQuery }) => {
  type ErrorWork = {
    message: string;
  };

  const [videos, setVideos] = useState<Video[]>([]);
  const [errorNetwork, setErrorNetwork] = useState<ErrorWork | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | undefined>(undefined);

  const loadVideos = async (search: string = "") => {
    try {
      const res = await videoService.getVideos(search);
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
    loadVideos(searchQuery);
  }, [searchQuery]);

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
