import "../Home.css";

import React, { useEffect, useState } from "react";

import addIcon from "../images/Add.svg";
import axios from "axios";
import check from "../images/check.svg";
import deleteIcon from "../images/Trash.svg";

export default function Home() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [counting, setCounting] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [counting, hours, minutes, seconds]);

  const handleStart = () => {
    // event.preventDefault();
    let totalSeconds = selectedData.hours * 3600 + selectedData.minutes * 60 + selectedData.seconds;
    setTimeLeft(totalSeconds);
    setCounting(true);
  };

  const handlePause = () => {
    setCounting(false);
  };

  const handleContinue = () => {
    setCounting(true);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/submit_form",
            // "http://127.0.0.1:5000/create_task",

        formData
      );
      console.log(response.data.message);
      // Optionally, reset the form after successful submission
      setFormData({
        title: "",
        category: "",
        description: "",
        date: "",
        hours: "",
        minutes: "",
        seconds: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch form data from API
    fetch("http://127.0.0.1:5000/gettasks")
    // fetch("http://127.0.0.1:5000/get_tasks")
      .then((response) => response.json())
      .then((data) => {
        // Update form data state with fetched data
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
      });
  }, []);

 


  // Function to handle div click and update selectedData state
  const handleDivClick = (data) => {
    setSelectedData(data);
    console.log('Clicked div data:', data)
  };

  return (
    <div className="home">
      <div className="timercontainer">
        <div className="timer">
          {/* <div className="time">{formatTime(timeLeft)}</div> */}
            {/* <div className="time">
              
              {formData.hours}:{formData.minutes}:{formData.seconds}
            </div> */}
            {isLoading ? (
              setIsLoading =
              <div className="time">{formatTime(timeLeft)}</div>
            ): (selectedData && (
              <div>
                {/* <h2>Selected Item</h2>
                <p>Name: {selectedData.title}</p> */}
                <div className="time">{formatTime(selectedData.seconds)}</div>
      
                {/* Render other properties of the selectedItem as needed */}
              </div>
            ))
            }
          
        </div>
        <button className="start" onClick={handleStart}>
          START
        </button>
        <div className="breaksect">
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleContinue}>Continue</button>
        </div>
        <p className="p"># Time to get Busy</p>
      </div>
      <div className="taskscontainer">
        <div className="tasktitle">Tasks</div>
        
        {data.map((task, index) => (
          
          <div key={index} className="tasksec" onClick={() => handleDivClick(task)}>
            
            <img src={check} alt="check" />
            <div className="taskdetails" >
              <div>{task.title}</div>
              <div>{task.category}</div>
              <div>{task.description}</div>
              <div>{task.date}</div>
              <div>
                {task.hours}:{task.minutes}:{task.seconds}
              </div>
              <div>Shop at Naivas</div>
            </div>
            <img className="deleteIcon" src={deleteIcon} alt="delete" />
          </div>
          
        ))}
       
        <form className="addtasksec" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="What are you working on?"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Categorize your task"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Add a Note/Description?"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <div className="duration">
            <label>Hours</label>
            <label>Minutes</label>
            <label>Seconds</label>
          </div>
          <div className="datetime">
            <div className="timeinput">
              <input
                type="date"
                placeholder="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <div className="timelines">
                {/* <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                ></input> */}
                <input
                  type="number"
                  placeholder="0"
                  name="hours"
                  min="0"
                  value={formData.hours}
                  onChange={handleChange}
                  required
                ></input>
                <input
                  type="number"
                  placeholder="0"
                  name="minutes"
                  min="0"
                  max="59"
                  value={formData.minutes}
                  onChange={handleChange}
                  required
                ></input>
                <input
                  type="number"
                  placeholder="0"
                  name="seconds"
                  min="0"
                  max="60"
                  value={formData.seconds}
                  onChange={handleChange}
                  required
                ></input>
              </div>
            </div>
          </div>
          <button type="submit">
            <img src={addIcon} alt="" />
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}