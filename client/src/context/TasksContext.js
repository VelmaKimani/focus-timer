import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const TasksContext = createContext()

export default function TasksProvider({children}) {

  function addTask(){

  }

  const contextData={addTask}

  return (
    <TasksContext.Provider value={contextData}>{children}</TasksContext.Provider>)
}
