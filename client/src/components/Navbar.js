import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css';
import checkring from '../images/Check_ring.svg'
import reportimg from '../images/Chart_duotone.svg'
import usercircle from '../images/User_cicrle_light.svg'


export default function Navbar() {
  return (
    <nav>
        <div class="logo">
            <div>
                <img src={checkring} alt="logo"/>
            </div>
            <div class="title">Pomodoro</div>
        </div>
        <div class="pages">
            <div class="navbutton">
                <img src={reportimg} alt=""/>
                Report</div>
            <div class="navbutton">
                <img src={usercircle} alt=""/>
                Login</div>
        </div>
    </nav>
  )
}
