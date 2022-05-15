import React,{useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom';
import Home from './Home'
export default function SearchResults() {
  const location=useLocation();
  let query=location.state.searchData
  const [url,setUrl]=useState(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=200&q=${query}&key=${process.env.REACT_APP_ID}`)


  return (
    <Home URL={url} />
  )
}
