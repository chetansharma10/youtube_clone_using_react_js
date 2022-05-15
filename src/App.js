import React,{useState} from 'react'
import {Routes,Route} from 'react-router-dom';

import Home from './Components/Main/Home';
import Explore from './Components/Main/Explore';
import Subscriptions from './Components/Main/Subscriptions';
import Shorts from './Components/Main/Shorts';
import Library from './Components/Main/Library';
import History from './Components/Main/History';
import Search from './Components/Main/Search';


import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import Main from './Components/Main';
import SearchResults from './Components/Main/SearchResults';

export default function App() {

  const [show,setShow]=useState(false);
  const toggleModel=()=>{
    setShow(!show);
  }
  return (
    <>


      <div className="container">
        <div className="leftBox">
          <SideBar showIt={false} toggleModel={toggleModel} />
        </div>

        <div className="rightBox">
          <NavBar />
          <Main/>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/explore' element={<Explore/>}></Route>
            <Route path='/shorts' element={<Shorts/>}></Route>
            <Route path='/subscriptions' element={<Subscriptions/>}></Route>
            <Route path='/library' element={<Library/>}></Route>
            <Route path='/history' element={<History/>}></Route>
            <Route path='/search' element={<Search/>}></Route>
            <Route path='/searchResults' element={<SearchResults/>}></Route>
          </Routes>
        </div>   


      </div>

      {
        show?
        <div className="modal">
          <div className="leftBox">
              <SideBar showIt={true} toggleModel={toggleModel} />
          </div>
        </div>:<></>
      }
  

    </>
  )
}
