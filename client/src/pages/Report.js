import React from 'react'
import '../Report.css'

import clock from '../images/clock.svg'
import calendar from '../images/Calendar.svg'
import sun from '../images/sun.svg'

export default function Report() {
  return (
    <section className="reportsect">
        <div className="activitycont">
            <h3>Activity Summary</h3>
            <div className="cardssec">
                <div className="card">
                    <img className="clock" src={clock} alt="hours focused"/>
                    <div className="cardno">0</div>
                    <p className="cardtext">hours passed</p>
                </div>
                <div className="card">
                    <img className="clock" src={calendar} alt="calendar"/>
                    <div className="cardno">1</div>
                    <p className="cardtext">days accessed</p>
                </div>
                <div className="card">
                    <img className="clock" src={sun} alt="streak"/>
                    <div className="cardno">0</div>
                    <p className="cardtext">day streak</p>
                </div>
            </div>
        </div>
        <div className="logcont">
            <h3>Activity Log </h3>
            <div className="filter">
                <button>Daily</button>
                <button>Weekly</button>
                <button> Monthly</button>
            </div>
            <div class="dropdown">
                <div class="dropbtn">Category</div>
                <div class="dropdown-content">
                    <a href="#">All</a>
                    <a href="#">Personal</a>
                    <a href="#">Work</a>
                    <a href="#">Family</a>
                </div>
            </div>
            <div>
                <h4>Details:</h4>
                <div className="tablecont">
                    <table>
                        <tr className="trspacer"></tr>
                        <tr>
                          <th style={{width:'15%'}}>Date</th>
                            <th style={{width:'25%'}}>Project/Task</th>
                            <th style={{width:'10%'}}>Time</th>
                            <th style={{width:'15%'}}>Category</th>
                            <th style={{width:'35%'}}>Description</th>
                        </tr>
                        <tr className="trspacer"></tr>
                        <tr className="row">
                            <td>
                                <p>13/Feb/2024</p>
                            </td>
                            <td>Shopping</td>
                            <td>12 hrs</td>
                            <td>Personal</td>
                            <td>Shop at Naivas</td>
                        </tr>
                        <tr className="trspacer"></tr>
                        <tr className="row">
                            <td>
                                <p>13/Feb/2024</p>
                            </td>
                            <td>Shopping</td>
                            <td>12 hrs</td>
                            <td>Personal</td>
                            <td>Shop at Naivas</td>
                        </tr>
                        <tr className="trspacer"></tr>
                        <tr className="row">
                            <td>
                                <p>13/Feb/2024</p>
                            </td>
                            <td>Shopping</td>
                            <td>12 hrs</td>
                            <td>Personal</td>
                            <td>Shop at Naivas</td>
                        </tr>
                        <tr className="trspacer"></tr>
                    </table>
                </div>  
            </div>
        </div>
    </section>
  )
}
