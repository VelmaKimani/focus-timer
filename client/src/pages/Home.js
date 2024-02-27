import '../Home.css';

import React, { useEffect, useState, useContext } from 'react'
import { TasksContext } from '../context/TasksContext';
import { UserContext } from '../context/UserContext';

import addIcon from '../images/Add.svg'
import check from '../images/check.svg'
import deleteIcon from '../images/Trash.svg'

export default function Home() {

  const { createTask, tasks } = useContext(TasksContext);
  const { user} = useContext(UserContext);


  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (counting && totalSeconds > 0) {
      const intervalId = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          setTimeLeft(totalSeconds);
          setHours(Math.floor(totalSeconds / 3600));
          setMinutes(Math.floor((totalSeconds % 3600) / 60));
          setSeconds(totalSeconds % 60);
        } else {
          clearInterval(intervalId);
          setCounting(false);
          showNotification();
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [counting, hours, minutes, seconds]);

  const handleStart = (event) => {
    event.preventDefault(); 
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimeLeft(totalSeconds);
    setCounting(true);
  };

  const handlePause = () => {
    setCounting(false);
  };

  const handleContinue = () => {
    setCounting(true);
  };

  const handleHoursChange = (e) => {
    setHours(parseInt(e.target.value));
  };

  const handleMinutesChange = (e) => {
    setMinutes(parseInt(e.target.value));
  };

  const handleSecondsChange = (e) => {
    setSeconds(parseInt(e.target.value));
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const showNotification = () => {
    if (Notification.permission === 'granted') {
      new alert('Countdown Timer', {
        body: 'The timer has run out!',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Countdown Timer', {
            body: 'The timer has run out!',
          });
        }
      });
    }
  };


  // The code below is for add task don't Touch Please!!!
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [hrs, setHrs] = useState('');
  const [mins,setMins]= useState('');
  const [secnds,setSecnds]= useState('');



  const handleTaskSubmit = (event) => {
    event.preventDefault();
    // Prepare task data
    const taskData = {
      title: title,
      category: category,
      description: description,
      date: date,
      hours: hrs,
      minutes: mins,
      seconds: secnds,
      completed: false, // Assuming default status is false
      user_id: `${user.logged_in_as}`, // Replace with actual user id
    };
    // Call createTask function to add task
    createTask(taskData);
    // Clear form fields after submission
    setTitle('');
    setCategory('');
    setDescription('');
    setDate('');
    setHrs('');
    setMins('');
    setSecnds('');
  };

  
  return (
    <div  className="home">
      <div className='timercontainer'>
        <div className='breaksect'>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleContinue}>Continue</button>
        </div>
        <div className='timer'>
          <div className='time'>
             {formatTime(timeLeft)}
          </div>
        </div>
        <button className='start' onClick={handleStart}>
          START
        </button>
        <div className='duration'>
          <label>Hours</label>
          <label>Minutes</label>
          <label>Seconds</label>
        </div>
        <div className='timeinput'>
          <input type='number' placeholder='0' min="0" value={hours} onChange={handleHoursChange}></input>
          <input type="number" placeholder='0' min="0" max="59" value={minutes} onChange={handleMinutesChange}></input>
          <input type="number" placeholder='0' min="0" max="60" value={seconds} onChange={handleSecondsChange}></input>
        </div>
        <p className='p'># Time to get Busy</p>
      </div>
      <div className='taskscontainer'>
        <div className='tasktitle'>Tasks</div>
          {tasks.map(task => (
            <div className='tasksec' key={task.id}>
              <img  src={check} alt="check" />
              <div className='taskdetails'>
                <div>{task.title}</div>
                <div>{task.completed ? 'Completed' : 'Ongoing'}</div>
                <div>{task.hours} hrs {task.minutes} mins {task.seconds} seconds</div>
                <div>{new Date(task.date).toDateString()}</div>
                <div>{task.category}</div>
                <div>{task.description}</div>
              </div>
              {/* Implement delete task functionality here */}
              <img className='deleteIcon' src={deleteIcon} alt='delete'/>
            </div>
          ))}
        
        <form className='addtasksec' onSubmit={handleTaskSubmit}>
          <input type='text' placeholder='What are you working on?' value={title} onChange={(e) => setTitle(e.target.value)}/>
          <input type='number' placeholder='Hours' value={hrs} min={0} onChange={(e) => setHrs(e.target.value)}/>
          <input type='number' placeholder='Minutes' value={mins} min={0} max={59} onChange={(e) => setMins(e.target.value)}/>
          <input type='number' placeholder='Seconds' value={secnds} min={0} max={60} onChange={(e) => setSecnds(e.target.value)}/>
          <input type='date' placeholder='date' value={date} onChange={(e) => setDate(e.target.value)}/>
          <input type='text' placeholder='Categorize your task' value={category} onChange={(e) => setCategory(e.target.value)}/>
          <input type='text' placeholder='Add a Note/Description?' value={description} onChange={(e) => setDescription(e.target.value)}/>
          <button type='submit' ><img src={addIcon}/>Add Task</button>
        </form>
      </div>
    </div>
  )
}
