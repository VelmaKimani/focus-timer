import React from 'react'
import '../Home.css';
import check from '../images/check.svg'
import deleteIcon from '../images/Trash.svg'
import addIcon from '../images/Add.svg'

export default function Home() {

  return (
    <div  className="home">
      <div className='timercontainer'>
        <div className='breaksect'>
          <button>Pause</button>
          <button>Continue</button>
        </div>
        <div className='timer'>
          <div className='time'>00:25:00</div>
        </div>
        <button className='start'>
          START
        </button>
        <div className='timeinput'>
          <input type='number' placeholder='Hrs' min="0"></input>
          <input type="number" placeholder='Mins' min="0" max="59"></input>
          <input type="number" placeholder='Seconds' min="0" max="60"></input>
        </div>
        <p className='p'># Time to get Busy</p>
      </div>
      <div className='taskscontainer'>
        <div className='tasktitle'>Tasks</div>
        <div className='tasksec'>
            <img  src={check} alt="check" />
          <div className='taskdetails'>
            <div>Shopping</div>
            <div>Ongoing</div>
            <div>25 min</div>
            <div>13/Feb/2024</div>
            <div>Personal</div>
            <div>Shop at Naivas</div>
          </div>
          <img className='deleteIcon' src={deleteIcon} alt='delete'/>
        </div>
        <div className='tasksec'>
            <img  src={check} alt="check" />
          <div className='taskdetails'>
            <div>Shopping</div>
            <div>Ongoing</div>
            <div>25 min</div>
            <div>13/Feb/2024</div>
            <div>Personal</div>
            <div>Shop at Naivas</div>
          </div>
          <img className='deleteIcon' src={deleteIcon} alt='delete'/>
        </div>
        <div className='tasksec'>
            <img  src={check} alt="check" />
          <div className='taskdetails'>
            <div>Shopping</div>
            <div>Ongoing</div>
            <div>25 min</div>
            <div>13/Feb/2024</div>
            <div>Personal</div>
            <div>Shop at Naivas</div>
          </div>
          <img className='deleteIcon' src={deleteIcon} alt='delete'/>
        </div>
        <form className='addtasksec'>
          <input type='text' placeholder='What are you working on?'/>
          <input type='text' placeholder='HH:MM'/>
          <input type='date' placeholder='date'/>
          <input type='text' placeholder='Categorize your task'/>
          <input type='text' placeholder='Add a Note/Description?'/>
          <button ><img src={addIcon}/>Add Task</button>
        </form>
      </div>
    </div>
  )
}
