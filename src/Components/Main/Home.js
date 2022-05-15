import VideoItem from './Nested/VideoItem'
import useHome from './Nested/useHome';
import React,{useRef,useEffect,useState} from 'react'
export default function Home(props) {

  
  const apiKey=process.env.REACT_APP_ID;
  const propURL=props.URL;
  const [url,setUrl]=useState(propURL?propURL:`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&chart=mostPopular&maxResults=500&key=${apiKey}`);
  const {loading,data,nextPageToken}=useHome(url);
  const elm=useRef();


  const callback=(entries,observer)=>{
      entries.forEach(entry=>{
        let ratio=entry.intersectionRatio;
        if(ratio>0){
          let pageToken=nextPageToken;
          let oldUrl=url+`&pageToken=${pageToken}`
          setUrl(oldUrl)
        }
      
      })
  }

  const startObserving=()=>{
    const observer=new IntersectionObserver(callback,{
      root:null,
      rootMargin:"0px",
    })
    if(elm.current){
      observer.observe(elm.current.lastChild)
    }
  }


  useEffect(()=>{
   
      startObserving();
    
  },[data])









  return (
    <div className="mainBox">
      <div className="homeContainer" ref={elm}>
          
          {
            loading?

            <div className="loader">
              <img src="assets/Preloader.gif"></img>
            </div> 
            :
            data[0].map((item,index)=>{
              return <VideoItem key={index} data={item}/>
            })
       
          
          }

         
      </div>
    </div>
  )
}


























