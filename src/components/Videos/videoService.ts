import axios from "axios";
import { Video } from "./video";

const API = "http://localhost:5001"


export const getVideos = async(search: string = "") => {
    console.log(search)
    return await axios.get<Video[]>(`${API}/videos`,{
        params: { busqueda: search }
      })
    
  
}

export const postVideo = async(video:Video) => {
    return await axios.post(`${API}/videos`,video)
    
  
}

export const getVideo = async(id:string) => {
    return await axios.get<Video>(`${API}/videos/${id}`)
    
  
}

export const updateVideo = async(id: string, video:Video) => {
    return await axios.put<Video>(`${API}/videos/${id}`,video)
    
  
}

export const deleteVideo = async(id: string) => {
    return await axios.delete<Video>(`${API}/videos/${id}`)
    
  
}