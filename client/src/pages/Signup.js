import React from 'react'
import {NavLink} from 'react-router-dom'
import '../Signup.css'
import user from '../images/usernameicon.svg'
import message from '../images/Message.svg'
import password from '../images/password.svg'

export default function Signup() {
  return (
    <form>
      <p class="title">Sign Up</p>
        <div class="slotcontainer">
            <img src={user} alt="Username"/>
            <input type="text" placeholder="Username"/>
        </div>
        <div class="slotcontainer">
            <img src={message} alt="email"/>
            <input type="email" placeholder="Email"/>
        </div>
        <div class="slotcontainer">
            <img src={password} alt="password"/>
            <input type="password" placeholder="Password"/>
        </div>
        <div class="regcontainer">
            <button onclick="submit()">Register</button>
        </div>
        <div class="loginsect">
            <p>Already have an account?</p>
            <NavLink to="/login">
              <button>Login</button>
            </NavLink>
        </div>
    </form>
  )
}
