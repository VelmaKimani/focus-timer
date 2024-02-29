import "../Home.css";

import React, { useContext, useEffect, useState } from "react";

import { TasksContext } from "../context/TasksContext";
import { UserContext } from "../context/UserContext";
import { ReportContext } from '../context/ReportContext'

import addIcon from "../images/Add.svg";
import axios from "axios";
import check from "../images/check.svg";
import deleteIcon from "../images/Trash.svg";
import updateIcon from "../images/update.svg";
import archiveIcon from "../images/archive.svg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Home() {
  const { createTask, tasks, deleteTask, updateTaskCompleted } =
    useContext(TasksContext);
  const { getReports } = useContext(ReportContext);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch form data from API
    fetch("http://127.0.0.1:5000/get_tasks")
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

  const [taskList, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const response = await axios.get("http://127.0.0.1:5000/gettasks"); // Assuming Flask server is running on the same host
  //     setTasks(response.data);
  //   };

  //   fetchTasks();
  // }, []);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setTimer(task);
    setIsRunning(false);
    setIsPaused(false); // Reset pause state when a new task is selected
  };

  useEffect(() => {
    let interval;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          let { hours, minutes, seconds } = prevTimer;
          const totalSeconds = hours * 3600 + minutes * 60 + seconds;
          if (totalSeconds === 0) {
            clearInterval(interval);
            setIsRunning(false);
            alert("Time is up!");
            // Update the completion status of the selected task
            if (selectedTask) {
              updateTaskCompleted(selectedTask.id);
            }
            return { hours: 0, minutes: 0, seconds: 0 };
          }

          if (seconds === 0) {
            if (minutes === 0 && hours !== 0) {
              hours--;
              minutes = 59;
            } else if (minutes !== 0) {
              minutes--;
            }
            seconds = 59; // Set seconds to 0 to prevent negative numbers
          } else {
            seconds--;
          }
          return { hours, minutes, seconds };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const handleStartTimer = () => {
    if (selectedTask) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    if (selectedTask) {
      setIsPaused(true);
    }
  };

  const handleContinue = () => {
    if (selectedTask) {
      setIsPaused(false);
    }
  };

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  // The code below is for add task don't Touch Please!!!
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hrs, setHrs] = useState("");
  const [mins, setMins] = useState("");
  const [secnds, setSecnds] = useState("");

  const handleTaskUpdate = (taskId) => {
    // Use navigate to navigate to the update page
    navigate(`/update/${taskId}`);
  };

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
    setTitle("");
    setCategory("");
    setDescription("");
    setDate("");
    setHrs("");
    setMins("");
    setSecnds("");
  };

  const handleArchiveTask = () => {
    if (selectedTask) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to archive this task!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, archive it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch('/create_report', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: selectedTask.title,
              category: selectedTask.category,
              description: selectedTask.description,
              date: selectedTask.date,
              hours: selectedTask.hours,
              minutes: selectedTask.minutes,
              seconds: selectedTask.seconds,
              completed: selectedTask.completed,
              user_id: user.logged_in_as, // Assuming you have user data available
            }),
          })
          .then((response) => {
            if (response.ok) {
              // Remove the archived task from the UI
              deleteTask(selectedTask.id);
              setSelectedTask(null);
              Swal.fire(
                'Archived!',
                'Your task has been archived.',
                'success'
              )
              getReports()
              navigate('/report')
            } else {
              console.error('Failed to archive task');
              Swal.fire(
                'Error!',
                'Failed to archive task.',
                'error'
              );
            }
          })
          .catch((error) => {
            console.error('Error archiving task:', error);
            Swal.fire(
              'Error!',
              'An error occurred while archiving the task.',
              'error'
            );
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your task is safe :)',
            'error'
          );
        }
      });
    }
  };

  return (
    <div className="home">
      <div className="timercontainer">
        <div className="timer">
          <div>
            <div className="time">
              {formatTime(timer.hours)}:{formatTime(timer.minutes)}:
              {formatTime(timer.seconds)}
            </div>
          </div>
        </div>
        <button
          className="start"
          onClick={handleStartTimer}
          disabled={!selectedTask || isRunning}
        >
          START
        </button>
        <div className="breaksect">
          <button onClick={handlePause} disabled={!isRunning || isPaused}>
            Pause Timer
          </button>
          <button onClick={handleContinue} disabled={!isRunning || !isPaused}>
            Continue Timer
          </button>
        </div>
        <p className="p"># Time to get Busy</p>
      </div>
      <div className="taskscontainer">
        <div className="tasktitle">Tasks</div>
        {tasks.map((task, index) => (
          <div
            key={index}
            className="tasksec"
            onClick={() => handleTaskSelect(task)}
          >
            {task.completed? <img src={archiveIcon} className="archiveIcon" onClick={handleArchiveTask}/>: ''}
            {task.completed? <img src={check} className="greencheck" alt="check" /> : <img src={check} alt="check" />}

            <div className="taskdetails">
              <div>{task.title}</div>
              <div>{task.completed ? "Completed" : "Ongoing"}</div>
              <div>
                {task.hours} : {task.minutes} : {task.seconds} 
              </div>
              <div>{new Date(task.date).toDateString()}</div>
              <div>{task.category}</div>
              <div>{task.description}</div>
            </div>
            {/* Implement update task functionality here */}
            <img
              className="updateIcon"
              src={updateIcon}
              alt="update"
              onClick={() => handleTaskUpdate(task.id)}
            />
            {/* Implement delete task functionality here */}
            <img
              className="deleteIcon"
              src={deleteIcon}
              alt="delete"
              onClick={() => deleteTask(task.id)}
            />
          </div>
        ))}

        <form className="addtasksec" onSubmit={handleTaskSubmit}>
          <input
            type="text"
            placeholder="What are you working on?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Categorize your task"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Add a Note/Description?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {/* <input type='number' placeholder='Hours' value={hrs} min={0} onChange={(e) => setHrs(e.target.value)}/>
          <input type='number' placeholder='Minutes' value={mins} min={0} max={59} onChange={(e) => setMins(e.target.value)}/>
          <input type='number' placeholder='Seconds' value={secnds} min={0} max={60} onChange={(e) => setSecnds(e.target.value)}/> */}

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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <div className="timelines">
                <input
                  type="number"
                  placeholder="0"
                  value={hrs}
                  min={0}
                  onChange={(e) => setHrs(e.target.value)}
                  required
                />

                <input
                  type="number"
                  placeholder="0"
                  value={mins}
                  min={0}
                  max={59}
                  onChange={(e) => setMins(e.target.value)}
                  required
                />

                <input
                  type="number"
                  placeholder="0"
                  value={secnds}
                  min={0}
                  max={60}
                  onChange={(e) => setSecnds(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit">
            <img src={addIcon} />
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
