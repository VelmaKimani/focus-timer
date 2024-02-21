import { createContext, useState, useEffect } from 'react'
import Swal from "sweetalert2";

export const UserContext = createContext()

export default function UserProvider({children}) {

  const [authToken, setAuthToken] = useState('');

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

  function Login(username, password) {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 401) {
        throw new Error('Invalid credentials');
      } else {
        throw new Error('Login failed');
      }
    })
    .then((response) => {
      sessionStorage.setItem('authToken', response.token);
      setAuthToken(response.token);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login successful.',
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        text: error.message,
      });
    });

  }

  const contextData={Signup,Login, authToken, setAuthToken}

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>  )
}