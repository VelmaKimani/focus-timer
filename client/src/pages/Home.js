import React from 'react'
import '../Home.css'

export default function Home() {
  return (
    <div  className="home">
      <div className='timercontainer'>
        <div className='breaksect'>
          <button>Break</button>
          <button>Continue</button>
        </div>
        <div className='timer'>
          <div className='time'>25:00</div>
        </div>
        <button className='start'>
          START
        </button>
        <p className='p'># Time to get Busy</p>
      </div>
      <div className='taskscontainer'>
        Tasks
      </div>
    </div>
  )
}
