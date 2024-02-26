import React, { useContext,useState, useCallback } from 'react'
import {NavLink} from 'react-router-dom'
import '../Signup.css'
import user from '../images/usernameicon.svg'
import message from '../images/Message.svg'

import passwordIcon from '../images/password.svg'
import { UserContext } from '../context/UserContext'


export default function Login() {

  const {Login}= useContext(UserContext)

  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { name, password } = formData;
      Login(name, password);
    },
    [formData, Login]
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="title" >Login</p>
        <div className="slotcontainer">
          <img src={user} alt="Username"/>
          <input 
            type="text" 
            name='name' 
            placeholder="Username"
            value={formData.name} 
            onChange={handleChange}
          />
        </div>
        <div className="slotcontainer">

            <img src={passwordIcon} alt="password"/>
            <input 
            type="password" 
            name='password' 
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            />
        </div>
        <div className="regcontainer">
            <button type='submit'>Login</button>
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