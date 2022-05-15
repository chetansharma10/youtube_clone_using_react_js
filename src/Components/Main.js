import React, { useRef } from 'react'
import { Outlet } from 'react-router-dom';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
export default function Main() {
  const slider = useRef();
  const slideLeft = () => {
    slider.current.scrollLeft -= 30

  }
  const slideRight = () => {
    slider.current.scrollLeft += 30

  }
  return (
    <>
      <div className="tags">
        <button className="left" onClick={() => slideLeft()}>
          <KeyboardArrowLeft />
        </button>
        <div className="tagsArea" ref={slider}>

          <div className="tag">
            <p>All</p>
          </div>


          <div className="tag">
            <p>Mahadeva</p>
          </div>


          <div className="tag">
            <p>UPSC Preparation</p>
          </div>


          <div className="tag">
            <p>Mahadeva</p>
          </div>

          <div className="tag">
            <p>All</p>
          </div>


          <div className="tag">
            <p>Mahadeva</p>
          </div>


          <div className="tag">
            <p>UPSC Preparation</p>
          </div>

          <div className="tag">
            <p>All</p>
          </div>


          <div className="tag">
            <p>Mahadeva</p>
          </div>


          <div className="tag">
            <p>UPSC Preparation</p>
          </div>


          <div className="tag">
            <p>Mahadeva</p>
          </div>

          <div className="tag">
            <p>All</p>
          </div>


          <div className="tag">
            <p>Mahadeva</p>
          </div>


          <div className="tag">
            <p>UPSC Preparation</p>
          </div>


          <div className="tag">
            <p>Mahadeva</p>
          </div>


          <div className="tag">
            <p>Mahadeva</p>
          </div>


          <div className="tag">
            <p>UPSC Preparation</p>
          </div>


          <div className="tag">
            <p>Mahadeva</p>
          </div>


          <div className="tag">
            <p>Mahadeva</p>
          </div>


          <div className="tag">
            <p>UPSC Preparation</p>
          </div>


          <div className="tag">
            <p>Mahadeva</p>
          </div>

          
          <div className="tag">
            <p>Mahadeva</p>
          </div>


          <div className="tag">
            <p>UPSC Preparation</p>
          </div>


          <div className="tag">
            <p>Mahadeva</p>
          </div>
        </div>

        <button className="right" onClick={() => slideRight()}>
          <KeyboardArrowRight />
        </button>
      </div>
      <Outlet />
    </>
  )
}
