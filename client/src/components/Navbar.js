import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Nav.css';
import checkring from '../images/Check_ring.svg'
import reportimg from '../images/Chart_duotone.svg'
import usercircle from '../images/User_cicrle_light.svg'

export default function Navbar() {
  return (
    <nav>
        <NavLink className="logo" to="/">
            <div>
                <img src={checkring} alt="logo"/>
            </div>
            <div className="title">Pomodoro</div>
        </NavLink>
        <div className="pages">
            <NavLink className="navbutton" to="/report">
                <img src={reportimg} alt="reporticon"/>
                Report
            </NavLink>
            <NavLink className="navbutton" to="/login">
                <img src={usercircle} alt="userimg"/>
                Login
            </NavLink>
        </div>
    </nav>
  )
}
