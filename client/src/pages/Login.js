import React from 'react'
import {NavLink} from 'react-router-dom'
import '../Signup.css'
import user from '../images/usernameicon.svg'
import message from '../images/Message.svg'
import password from '../images/password.svg'
export default function Login() {
  return (
    <form>
      <p className="title">Login</p>
        <div className="slotcontainer">
          <img src={user} alt="Username"/>
          <input type="text" placeholder="Username"/>
        </div>
        <div className="slotcontainer">
            <img src={message} alt="password"/>
            <input type="password" placeholder="Password"/>
        </div>
        <div className="regcontainer">
            <button onclick="submit()">Login</button>
        </div>
        <div className="loginsect">
            <p>Don't have an account?</p>
            <NavLink to="/signup">
              <button>Register</button>
            </NavLink>
        </div>
    </form>
  )
}
