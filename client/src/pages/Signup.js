import React, { useContext,useState } from 'react'
import {NavLink} from 'react-router-dom'
import '../Signup.css'
import user from '../images/usernameicon.svg'
import message from '../images/Message.svg'
import password from '../images/password.svg'
import {UserContext} from '../context/UserContext'

export default function Signup() {
  const {Signup}= useContext(UserContext)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  function handleSubmit(e){
    e.preventDefault();
    const { name, email, password } = formData;
    Signup(name, email, password);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <p class="title">Sign Up</p>
        <div class="slotcontainer">
            <img src={user} alt="Username"/>
            <input 
            type="text" 
            name='name' 
            placeholder="Username"
            value={formData.name} 
            onChange={handleChange}
            />
        </div>
        <div class="slotcontainer">
            <img src={message} alt="email"/>
            <input 
            type="email" 
            name='email'
            placeholder="Email"
            value={formData.email} 
            onChange={handleChange}
            />
        </div>
        <div class="slotcontainer">
            <img src={password} alt="password"/>
            <input 
            type="password" 
            name='password' 
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            />
        </div>
        <div class="regcontainer">
            <button type='submit'>Register</button>
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