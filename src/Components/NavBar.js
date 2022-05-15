import React,{useEffect,useState} from 'react'
import KeyboardVoiceOutlinedIcon from '@material-ui/icons/KeyboardVoiceOutlined';
import SearchIcon from '@material-ui/icons/Search';


import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

import {useNavigate} from 'react-router-dom';

export default function NavBar(props) {

  const [loginToggle,setLoginToggle]=useState(false);
  const navigate=useNavigate();
  const [query,setQuery]=useState("");


  useEffect(()=>{
    if(loginToggle){
        document.querySelector(".loginBtn").click();
    }
  },[loginToggle])

 


  const executeQuery=()=>{
    if(query){
      navigate("/searchResults",{state:{searchData:query}});
    }
    else{
      navigate("/")
    }
  }

  return (
    <div className="navBar">
      <div className="logo">
        <object data="/assets/logo.svg" alt="logo" aria-label='logo'></object>
        <p>Youtube</p>
      </div>

      <div className="search">
        <div className="inputContainer">
          <input type="text" onChange={(e)=>setQuery(e.target.value)} placeholder='Search'></input>
          <button onClick={()=>executeQuery()}><SearchIcon/></button>
        </div>
        <button className="voiceBtn"><KeyboardVoiceOutlinedIcon/></button>
      </div>

      <div className="extras">
        <button onClick={()=>setLoginToggle(!loginToggle)}><AccountCircleOutlinedIcon/></button>
      </div>
      
      
    </div>
  )
}
