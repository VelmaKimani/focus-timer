import React, { createContext, useState, useContext } from 'react'
import Swal from "sweetalert2";
import {UserContext} from './UserContext'

export const TasksContext = createContext()

export default function TasksProvider({children}) {

  const { authToken} = useContext(UserContext);
  
  const createTask = (taskData) => {
    fetch('/create_task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to create task');
        }
      })
      .then((data) => {
        console.log('Task created successfully:', data);
        // Do something with the response if needed
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Task Added Successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error('Error creating task:', error);
        Swal.fire({
          icon: 'error',
          text: error.message || 'Error creating task:',
        });
      });
  };

  const contextData={ createTask}

  return (
    <TasksContext.Provider value={contextData}>{children}</TasksContext.Provider>)
}
