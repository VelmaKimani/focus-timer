import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Nav.css';
import checkring from '../images/Check_ring.svg'
import reportimg from '../images/Chart_duotone.svg'
import usercircle from '../images/User_cicrle_light.svg'

export default function Navbar() {
  return (
    <nav>
        <NavLink className="logo" to="/" activeClassName="active-link">
            <div>
                <img src={checkring} alt="logo"/>
            </div>
            <div className="title"><span>Pomodoro</span></div>
        </NavLink>
        <div className="pages">
            <NavLink className="navbutton" to="/report" activeClassName="active-link">
                <img src={reportimg} alt="reporticon"/>
                <span>Report</span>
            </NavLink>
            <NavLink className="navbutton" to="/login" activeClassName="active-link">
                <img src={usercircle} alt="userimg"/>
                <span>Login</span>
            </NavLink>
        </div>
    </nav>
  )
}
