import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

export const UserContext = createContext()

export default function UserProvider({children}) {

    function addUser(){

    }


    const contextData={addUser}

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>  )
}
