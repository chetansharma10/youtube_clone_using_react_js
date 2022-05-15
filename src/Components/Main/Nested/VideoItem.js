import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



export default function VideoItem(props) {
    
  const [channelImg,setChannelImg]=useState("");
  const [time,setTime]=useState("");
  const [load,setLoad]=useState(false);
  const id=typeof(props.data.id)==="string"?props.data.id:props.data.id.videoId;
  const thumbImage=`https://img.youtube.com/vi/${id}/mqdefault.jpg`
  const duration=props.data.contentDetails?props.data.contentDetails.duration:"";
  const navigate=useNavigate();
  const [newData,setNewData]=useState([]);

  const setTimerOfVideo=()=>{

    if(duration!=undefined && duration!==""){
        try{
            let x=duration.split("PT")[1];
            let min=x.split("M")[0];
            let sec=x.split("M")[1].split("S")[0];
            setTime(`${min}:${sec} sec`);
        }
        catch(error){
            setTime("")
        }
      
    }

        
  }
  
  const callApi=()=>{
    const channelId=props.data.snippet.channelId;
    const apiKey=process.env.REACT_APP_ID;
    const channelDetailsUrl=`https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&id=${channelId}&key=${apiKey}`;
   
    axios.get(channelDetailsUrl)
    .then((response)=>{
        setChannelImg(response.data.items[0].snippet.thumbnails.default.url)
        setTimerOfVideo();
        setLoad(true)
    })
    .catch((error)=>{
        console.log(error)
    })

  }
 

  useEffect(()=>{
    getData(id)
    callApi();
  },[])


  const getData=(id)=>{
    axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${process.env.REACT_APP_ID}`)
    .then((response)=>{
      setNewData(response.data.items)
    })
    .catch((error)=>{
      console.log(error)
    })
  }


  return (
    <div className="vidItem" onClick={()=>navigate(`/search/?q=${id}`,{state:typeof(props.data.id)==="string"?props.data:newData[0]})}>

        <div className="imgDiv">
            {
                !load?
                <div className="temp"></div>:
                <img async src={thumbImage} alt="img">
                </img>
            }
            <span>{time?time:""}</span>
            
        </div>

        <div className="btmDiv">
            <div className="lDiv">
                {
                    !load?<Skeleton circle={true} style={{width:"35px",height:"35px"}} />:
                    <img src={channelImg?channelImg:""} alt="chimg"></img>
                }
            </div>
            <div className="rDiv">
                <h5>{props.data.snippet.title}</h5>
                <p>
                  <span>{props.data.snippet.channelTitle}</span>
                </p>
            </div>
        </div>


    </div>
  )
}
