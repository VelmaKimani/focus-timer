import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import '../Nav.css';
import checkring from '../images/Check_ring.svg'
import reportimg from '../images/Chart_duotone.svg'
import usercircle from '../images/User_cicrle_light.svg'
import { UserContext } from '../context/UserContext'

export default function Navbar() {

    const {Logout, authToken, userData, user}= useContext(UserContext) 

  return (
    <nav>
        <NavLink className="logo" to="/">
            <div>
                <img src={checkring} alt="logo"/>
            </div>
            <div className="title">FocusTimer</div>
        </NavLink>
        <div className="pages">
            <NavLink className="navbutton" to="/">
                Home
            </NavLink>
            <NavLink className="navbutton" to="/report">
                <img src={reportimg} alt="reporticon"/>
                Report
            </NavLink>
            {authToken ? (
                <>
                    <div className="navbutton" onClick={Logout}>
                        <img src={usercircle} alt="userimg" />
                        Logout
                        
                        {user && <div className="username">{userData.username}</div>}
                    </div>
                    
                </>
                ) : (
                <NavLink className="navbutton" to="/login">
                    <img src={usercircle} alt="userimg" />
                    Login
                </NavLink>
            )}
        </div>
    </nav>
  )
}
