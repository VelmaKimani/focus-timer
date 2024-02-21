import { createContext, useState, useEffect } from 'react'
import Swal from "sweetalert2";

export const UserContext = createContext()

export default function UserProvider({children}) {


  function Signup(username,email,password){
    fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your account has been created, login.',
            showConfirmButton: false,
            timer: 1500,
          })
        } else if (res.status === 400) {
          Swal.fire({
            icon: 'error',
            text: 'Username or email already exists!',
          })
        }
      })
      .catch((err) => console.log(err))
  }

  const contextData={Signup}

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>  )
}
