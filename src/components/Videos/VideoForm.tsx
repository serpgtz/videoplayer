import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Video } from "./video";
import * as  videoService from "./videoService"
import { toast, Zoom   } from "react-toastify";



type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

type Params = Record<string, string | undefined>;

const VideoForm = () => {

  const navigate = useNavigate();

  const params = useParams<Params>();

  console.log(params)

  const initialState = {
    title:"",
    url:"",
    descripcion:""
  }

  const [video, setVideo] = useState<Video>(initialState)
  
  const handleInputChange = (e:InputChange ) => {
    setVideo({...video, [e.target.name]: e.target.value})
     
    
  }

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {

    try {
      e.preventDefault();


   
      if(!params.id){
        await videoService.postVideo(video)
        toast.success("New Video Added!!",{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom
        })
        setVideo(initialState)
      }else {
        console.log("Updating")
        await videoService.updateVideo(params.id, video)
      }
      
     
      navigate('/');



    
    } catch (error) {
      console.log(error)
    }
    
  }

  const getVideo = async (id:string) => {
    const res = await videoService.getVideo(id)
    const { title, descripcion, url} =res.data;
    setVideo({title,descripcion,url})


    console.log(res)
  }

  useEffect(()=> {
    if(params.id)getVideo(params.id)

  },[params.id])


  return (
   <div className="row">
    <div className="col-md-4 offset-md-4">
      <div className="card">
        <div className="card-body">
          <h3>New Video</h3>
          <form onSubmit={handleSubmit}>
           <div className="form-group">
           <input 
            type="text" 
            name='title' 
            placeholder='Write a title por this video' 
            className='form-control'
            onChange={handleInputChange}
            autoFocus
            value={video.title}/>
           </div>

           <div className="form-group mt-2">
              <input 
               type="text"
               name="url"
               placeholder='https://somesite.com'
               onChange={handleInputChange}
               value={video.url}
              className='form-control' />

              <div className="form-group mt-3">
                  <textarea name="descripcion"
                   rows={3}
                   className='form-control'
                   placeholder='Write a descripcion'
                   onChange={handleInputChange}
                   value={video.descripcion}>
                   

                   </textarea>
              </div>
           </div>
           {
            params.id ?
           ( <button className='btn btn-info  mt-2'>
            Upted Video
        </button>)
                      :
             ( <button className='btn btn-outline-secondary  mt-2'>
              Create Video
          </button>)
           }
          </form>
        </div>
      </div>
    </div>
   </div>
  )
}

export default VideoForm
