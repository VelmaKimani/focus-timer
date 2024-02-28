import React, { useEffect, useState, useContext } from 'react'
import '../Report.css'

import clock from '../images/clock.svg'
import calendar from '../images/Calendar.svg'
import sun from '../images/sun.svg'
import { ReportContext } from '../context/ReportContext'
import { UserContext } from '../context/UserContext';



export default function Report() {

    const { reports,getReports } = useContext(ReportContext);
    const { user} = useContext(UserContext);


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
                        <thead>
                            <tr className="trspacer"></tr>
                            <tr>
                                <th style={{width:'15%'}}>Date</th>
                                <th style={{width:'25%'}}>Project/Task</th>
                                <th style={{width:'10%'}}>Time</th>
                                <th style={{width:'15%'}}>Category</th>
                                <th style={{width:'35%'}}>Description</th>
                            </tr>
                            <tr className="trspacer"></tr>
                        </thead>
                        <tbody>
                            {reports &&
                                        reports.map((report, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <p>{new Date(report.date).toDateString()}</p>
                                                </td>
                                                <td>{report.title}</td>
                                                <td>
                                                    {report.hours} hrs {report.minutes} mins {report.seconds} seconds
                                                </td>
                                                <td>{report.category}</td>
                                                <td>{report.description}</td>
                                            </tr>
                                        ))}
                        </tbody>  
                    </table>
                </div>  
            </div>
        </div>
    </section>
  );
}
