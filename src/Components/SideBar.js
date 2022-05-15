import React,{useState,useEffect} from 'react'
import MenuIcon from '@material-ui/icons/Menu';


import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HomeIcon from '@material-ui/icons/Home';

import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import ExploreIcon from '@material-ui/icons/Explore';

import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';

import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';

import RestoreIcon from '@material-ui/icons/Restore';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import {NavLink,useLocation} from 'react-router-dom';

export default function SideBar(props) {
  const location=useLocation();
  const [whoFocusIcon,setFocusIcon]=useState([false,false,false,false,false,false]);
  useEffect(()=>{
    switch(location.pathname){
      case "/":
        setFocusIcon([true,false,false,false,false,false])
        break;
      case "/explore":
        setFocusIcon([false,true,false,false,false,false])
        break;
      case "/subscriptions":
        setFocusIcon([false,false,true,false,false,false])
        break;
      case "/library":
        setFocusIcon([false,false,false,true,false,false])
        break;
      case "/history":
        setFocusIcon([false,false,false,false,true,false])
        break;
      default:
        setFocusIcon([true,false,true,false,false,false])
        break;
    }




  },[location])


  const toggleSide=()=>{
    props.toggleModel()
  }


 
  return (
    <div className="sideBar"  >
        {
          props.showIt?
          <div className="logo-btn">
            <button onClick={()=>toggleSide()}>
              <CloseOutlinedIcon/>
            </button>

            <div className="logo">
              <object data="/assets/logo.svg" aria-label='logo2' alt='logo2'></object>
              <p>Youtube</p>
            </div>
         </div>:
         <button className="hambtn"  onClick={()=>toggleSide()}>
          <MenuIcon/>
        </button>

        }
       
      
   
    
        <div className="icons">
          <div className="icon" >
            <NavLink to="/" >
              {
                whoFocusIcon[0]?<HomeIcon/>:<HomeOutlinedIcon/>
              }
              <p >Home</p>
            </NavLink>
          </div>


          <div className="icon">
            <NavLink to="/explore">
              {
                whoFocusIcon[1]?<ExploreIcon/>:<ExploreOutlinedIcon/>
              }
              <p>Explore</p>
            </NavLink>
          </div>

       

          <div className="icon">
            <NavLink to="/subscriptions">
              {
                whoFocusIcon[2]?<SubscriptionsIcon/>:<SubscriptionsOutlinedIcon/>
              }
              <p>Subscriptions</p>
            </NavLink>
          </div>


          <div className="icon">
            <NavLink to="/library">
              {
                whoFocusIcon[3]?<VideoLibraryIcon/>:<VideoLibraryOutlinedIcon/>
              }
              <p>Library</p>
            </NavLink>
          </div>


          <div className="icon">
            <NavLink to="/history">
              {
                whoFocusIcon[4]?<RestoreOutlinedIcon/>:<RestoreIcon/>
              }
              <p>History</p>
            </NavLink>
          </div>
        </div>

        


    </div>
  )
}
