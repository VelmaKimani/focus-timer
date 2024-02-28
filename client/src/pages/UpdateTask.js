import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../Home.css';
import updateIcon from '../images/update.svg';
import { TasksContext } from '../context/TasksContext';
import {UserContext} from '../context/UserContext'

export default function UpdateTaskForm() {

    const { taskId } = useParams();
    const { updateTask } = useContext(TasksContext);
    const navigate = useNavigate();

    


  return (
    <div className='taskscontainer'>
        <h2>Update Task</h2>
        { updatedTaskData.title && updatedTaskData.category && (
        <form className='addtasksec' onSubmit={handleSubmit}>
            <input type='text' placeholder='What are you working on?' value={title} onChange={handleChange}/>
            <input type='number' placeholder='Hours' value={hours} min={0} onChange={handleChange}/>
            <input type='number' placeholder='Minutes' value={minutes} min={0} max={59} onChange={handleChange}/>
            <input type='number' placeholder='Seconds' value={seconds} min={0} max={60} onChange={handleChange}/>
            <input type='date' placeholder='date' value={date} onChange={handleChange}/>
            <input type='text' placeholder='Categorize your task' value={category} onChange={handleChange}/>
            <input type='text' placeholder='Add a Note/Description?' value={description} onChange={handleChange}/>
            <button type='submit' ><img src={updateIcon}/>Update Task</button>
        </form>
        )}
    </div>
  )
};
