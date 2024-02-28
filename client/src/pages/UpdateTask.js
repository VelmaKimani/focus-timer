import "../Home.css";

import React, { useContext, useEffect, useState } from "react";

import { TasksContext } from "../context/TasksContext";
import updateIcon from "../images/update.svg";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function UpdateTaskForm() {
  const { taskId } = useParams();
  const { updateTask } = useContext(TasksContext);
  const navigate = useNavigate();

  // State variables to store task data
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Fetch task data from the API
    fetch(`/get_task/${taskId}`)
      .then((response) => response.json())
      .then((data) => {
        const taskData = data.tasks;
        setTitle(taskData.title);
        setHours(parseInt(taskData.hours)); // Convert hours to integer
        setMinutes(parseInt(taskData.minutes)); // Convert minutes to integer
        setSeconds(parseInt(taskData.seconds));
        setDate(taskData.date);
        setCategory(taskData.category);
        setDescription(taskData.description);
        setCompleted(taskData.completed);
      })
      .catch((error) => console.error("Error fetching task:", error));
  }, [taskId]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert hours, minutes, and seconds to Python datetime objects
    const time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);
    time.setSeconds(seconds);

    console.log(typeof date);

    // Format the date object to a string in ISO 8601 format
    let formattedDate;
    if (date instanceof Date) {
      formattedDate = date.toISOString();
    } else {
      // Parse the date string into a JavaScript Date object
      const parsedDate = date ? new Date(date) : null;
      formattedDate = parsedDate ? parsedDate.toISOString() : "";
    }

    updateTask(taskId, {
      title,
      date: formattedDate,
      hours,
      minutes,
      seconds,
      category,
      description,
      completed,
    });
    // Navigate to a different route after updating task
    navigate("/");
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update state based on input field name
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "hours":
        setHours(parseInt(value));
        break;
      case "minutes":
        setMinutes(parseInt(value));
        break;
      case "seconds":
        setSeconds(parseInt(value));
        break;
      case "date":
        // Parse the date string into a JavaScript Date object
        const parsedDate = value ? new Date(value) : "";
        console.log(typeof parsedDate); // Check the type of the parsedDate
        setDate(parsedDate);
        break;
      case "category":
        setCategory(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "completed":
        setCompleted(value === "true");
        break;
      default:
        break;
    }
  };

  return (
    <div className="home">
      <h2>Update Task</h2>
      <form className="addtasksec" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="What are you working on?"
          value={title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Categorize your task"
          value={category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Add a Note/Description?"
          value={description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="completed"
          placeholder="Is task Completed true or false?"
          value={completed.toString()}
          onChange={handleChange}
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
              name="date"
              placeholder="date"
              value={date}
              onChange={handleChange}
            />
            <div className="timelines">
              <input
                type="number"
                name="hours"
                placeholder="Hours"
                value={hours}
                min={0}
                onChange={handleChange}
              />
              <input
                type="number"
                name="minutes"
                placeholder="Minutes"
                value={minutes}
                min={0}
                max={59}
                onChange={handleChange}
              />
              <input
                type="number"
                name="seconds"
                placeholder="Seconds"
                value={seconds}
                min={0}
                max={60}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button type="submit">
          <img src={updateIcon} alt="update"  sizes="20px"/>
          Update Task
        </button>
      </form>
    </div>
  );
}
