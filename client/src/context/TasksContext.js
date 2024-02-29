import React, { createContext, useState, useContext, useEffect} from 'react'
import Swal from "sweetalert2";
import {UserContext} from './UserContext'

export const TasksContext = createContext()

export default function TasksProvider({children}) {

  const { user,authToken} = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [newTaskCreated, setNewTaskCreated] = useState(false);

  
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
        setNewTaskCreated(true);
        // Trigger getTasks to refresh the tasks list
        getTasks();
      })
      .catch((error) => {
        console.error('Error creating task:', error);
        Swal.fire({
          icon: 'error',
          text: error.message || 'Error creating task:',
        });
      });
  };

  const getTasks = () => {
    if (user && user.logged_in_as){
      fetch(`/get_tasks/${user.logged_in_as}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch tasks');
          }
        })
        .then((data) => {
          console.log('Tasks fetched successfully:', data);
          setTasks(data.tasks);
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
          Swal.fire({
            icon: 'error',
            text: error.message || 'Error fetching tasks:',
          });
        });
    }
  };

  useEffect(() => {
    if (authToken && user) {
      getTasks();
    }
  }, [authToken, user, newTaskCreated]); // Fetch tasks when authToken or user changes, or when a new task is created
  
 // Fetch tasks when authToken or user changes
  // Add cleanup function to clear tasks when unmounting or authToken/user changes
  useEffect(() => {
    return () => setTasks([]);
  }, [authToken, user]);
  
  const deleteTask = (taskId) => {
    fetch(`/delete_task/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted task from the tasks list
          setTasks(tasks.filter(task => task.id !== taskId));
          // Show success message
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Task Deleted Successfully.',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          throw new Error('Failed to delete task');
        }
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
        Swal.fire({
          icon: 'error',
          text: error.message || 'Error deleting task:',
        });
      });
  };

  const updateTask = (taskId, updatedTaskData) => {
    fetch(`/update_task/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updatedTaskData),
    })
      .then((response) => {
        if (response.ok) {
          // Show success message
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Task Updated Successfully.',
            showConfirmButton: false,
            timer: 1500,
          });
          // Return the response for the next `then` block
          return response.json();
        } else {
          throw new Error('Failed to update task');
        }
      })
      .then((data) => {
        // Update the tasks list with the updated task data
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTaskData } : task)));
        // Trigger getTasks to refresh the tasks list
        getTasks();
      })
      .catch((error) => {
        console.error('Error updating task:', error);
        Swal.fire({
          icon: 'error',
          text: error.message || 'Error updating task:',
        });
      });
  };

  const updateTaskCompleted = (taskId) => {
    fetch(`/update_task_completed/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((response) => {
        if (response.ok) {
          // Show success message
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Task Completed.',
            showConfirmButton: false,
            timer: 1500,
          });
          // Trigger getTasks to refresh the tasks list
          getTasks();
        } else {
          throw new Error('Failed to update task completion status');
        }
      })
      .catch((error) => {
        console.error('Error updating task completion status:', error);
        Swal.fire({
          icon: 'error',
          text: error.message || 'Error updating task completion status:',
        });
      });
  };


  const contextData={ createTask, tasks, deleteTask, updateTask, updateTaskCompleted, getTasks}

  return (
    <TasksContext.Provider value={contextData}>{children}</TasksContext.Provider>)
}
