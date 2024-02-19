import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../App.css';

export default function Layout() {
  return (
    <div className='body'>
        <Navbar />
        <Outlet/>
    </div>
  )
}
