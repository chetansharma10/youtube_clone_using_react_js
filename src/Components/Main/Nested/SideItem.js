import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import {useNavigate} from 'react-router-dom';
export default function SideItem(props) {
    
    const [load,setLoad]=useState(false);
    const [title,setTitle]=useState("");
    const [id,setId]=useState("")
    const navigate=useNavigate();
    const [views,setViews]=useState("");
    const thumbImage=`https://img.youtube.com/vi/${id}/mqdefault.jpg`

    useEffect(()=>{
        setViews(counts(props.data.statistics.viewCount))
        setTitle(props.data.snippet.title)
        setId(props.data.id)
    },[load])
    const counts=(x)=>{
        let pows=Math.floor(Math.log10(x));
        if(x>10**3 && x<10**6){
          return (x/10**pows).toFixed(1)+"K";
        }
        if(x>=10**6 && x<10**8){
          return (x/10**pows).toFixed(1)+"M";
        }
        if(x>=10**8 && x<10**10){
          return (x/10**pows).toFixed(1)+"B";
        }
        if(x>=10**10){
          return (x/10**pows).toFixed(1)+"T";
        }
        return x.toFixed(1);
      }

  


  return  <>
        <div className="sideItem" onClick={()=>navigate(`/search/?q=${id}`,{state:props.data})}>
            <img src={thumbImage} alt="side"></img>
            <div className="sideDesc">
                <h5>{title}</h5>
                <small>{props.data.snippet.channelTitle}</small>
                <small>{views} views &nbsp;</small>
            </div>
        </div>
      </>

  
}
