import React, { useEffect ,useState} from 'react'
import { useSearchParams,useLocation} from 'react-router-dom';
import axios from 'axios';
import {ThumbUpOutlined,ThumbDownOutlined,ShareOutlined} from "@material-ui/icons";
import Skeleton from 'react-loading-skeleton'
import SideItem from './Nested/SideItem';
import useHome from './Nested/useHome'

export default function Search() {
    const [params]=useSearchParams();
    const videoId=params.get("q");
    const [url,setUrl]=useState(``);
    const [snippet,setSnippet]=useState({});
    const [load,setLoad]=useState(false);
    const [statistics,setStatistics]=useState({})
    const [subs,setSubs]=useState("");
    const [date,setDate]=useState("");
    const [channelImg,setChannelImg]=useState("");
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const apiKey=process.env.REACT_APP_ID;
    const [vidURL,setVidUrl]=useState(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&chart=mostPopular&maxResults=30&key=${apiKey}`);
    const {loading,data}=useHome(vidURL);
    const location=useLocation();
    const [comments,setComments]=useState([]);

    const [showDesc,setShowDesc]=useState(false);


    useEffect(()=>{
      console.log("Search result",location.state)
      updateURL(videoId)
      setSnippet(location.state.snippet);
      setStatistics(location.state.statistics);


      const tempDate=new Date(location.state.snippet.publishedAt);
      const str=`${monthNames[tempDate.getMonth()]},${tempDate.getDay()},${tempDate.getFullYear()}`

      setDate(str)
      channelInfo(location.state.snippet.channelId)
      getSubscribers(location.state.snippet.channelId)
    
    },[location])

    const updateURL=(id)=>{
      let URL=`https://www.youtube.com/embed/${id}?autoplay=0&mute=1`;
      setUrl(URL);
      console.log("Called",URL)
    }



    const channelInfo=(id)=>{
      const channelId=id
      const channelDetailsUrl=`https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&id=${channelId}&key=${apiKey}`;
     
      axios.get(channelDetailsUrl)
      .then((response)=>{
        setChannelImg(response.data.items[0].snippet.thumbnails.default.url)
        readComments(videoId)
        setLoad(true)


      })
      .catch((error)=>{
          console.log(error)
      })
    }


    const subscribersCounter=(x)=>{
      let pows=Math.floor(Math.log10(x));
      if(x>10**3 && x<10**6){
        return x/10**pows+" K";
      }
      if(x>=10**6 && x<10**8){
        return x/10**pows+" M";
      }
      if(x>=10**8 && x<10**10){
        return x/10**pows+" B";
      }
      if(x>=10**10){
        return x/10**pows+" T";
      }
      return x;
    }




    const getSubscribers=(id)=>{
      const apiKey=process.env.REACT_APP_ID;
     
      const urlx=`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${id}&key=${apiKey}`;
      axios.get(urlx)
      .then((response)=>{
        let x=response.data.items[0].statistics.subscriberCount;
        let res=subscribersCounter(x);
        setSubs(res)
      })
      .catch((error)=>{
          console.log(error)
      })

    
    }


    const readComments=(pid)=>{
      const commUrl=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${pid}&key=${apiKey} `;

      axios.get(commUrl).then((response)=>{
        console.log("Comments")
        setComments(response.data.items);
      }).catch((error)=>{
        console.log(error)
      })
    }


  return (
    <div className="searchBox">
      <div className="leftPlayer">
        <iframe 
          src={url}>
        </iframe>

        <div className="details">
          <p> 
            {
              snippet.tags?
              snippet.tags.map((item,index)=>{
              return <small style={{color:"blue"}} key={index}> #{item}</small>
              }):""

            }
          </p>
          <h3>{snippet.title}</h3>
       
          <div className="vws">
            <p>{statistics.viewCount} <small>views</small>  {date}</p>
            <div className="buttons">
               <button><ThumbUpOutlined/><span>21k</span></button>
               <button><ThumbDownOutlined/><span>0k</span></button>
               <button><ShareOutlined/></button>
            </div>
          </div>


          <div className="channel">

            <div className="cen">
              {
                    !load?<Skeleton circle={true} style={{width:"35px",height:"35px"}} />:
                    <img src={channelImg} alt="chimg"></img>
                }
              <div>
                <h5>{snippet.channelTitle}</h5>
                <p>{subs} Subscribers</p>
              </div>
            </div>


            <button>Subscribe</button>
          </div>

          <div className="btmDesc">
            <p className={!showDesc?"hideSome":"showAll"}>{snippet.description}</p>
            <small onClick={(e)=>setShowDesc(!showDesc)}>
              {
                !showDesc?"...more":"Show Less"
              }
            </small>
          </div>


          <div className="comments">
             <h4>{comments.length} Comments</h4>
             {
               load?
               comments.map((comment,index)=>{
                
                return <div className="commentBox" key={index}>                          
                          <img async src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}></img>
                          <div className="commentDesc">
                            <p>{comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
                            <p><small>{comment.snippet.topLevelComment.snippet.textDisplay}</small></p>
                          </div>
                       </div>
               }):
               <></>

             }
             </div>

          </div>


      </div>
      <div className="videoItems">
        {
          !loading?
          data[0].map((item,index)=>{
            if(item.id!==videoId){
              return <SideItem  key={index} data={item} updateData={updateURL}  />
            }
          }):
          ""
        }
      </div>

    </div>
  )
}
