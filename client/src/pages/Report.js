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
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredReports, setFilteredReports] = useState([]);

    // Function to extract unique categories from reports
    useEffect(() => {
        if (reports && reports.length > 0) {
            const uniqueCategories = [...new Set(reports.map(report => report.category))];
            setCategories(uniqueCategories);
        }
    }, [reports]);

    // Function to filter reports based on selected category
    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredReports(reports);
        } else {
            const filtered = reports.filter(report => report.category === selectedCategory);
            setFilteredReports(filtered);
        }
    }, [selectedCategory, reports]);

    // Function to handle category selection change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    }

    // Function to sort reports by date in descending order
    const sortedReports = [...filteredReports].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate total hours passed
    const totalHours = sortedReports.reduce((acc, report) => {
        const hours = parseInt(report.hours);
        const minutes = parseInt(report.minutes);
        const seconds = parseInt(report.seconds);
        return acc + hours + minutes / 60 + seconds / 3600;
    }, 0);

    // Calculate unique dates and total days accessed
    const uniqueDates = new Set(sortedReports.map(report => new Date(report.date).toDateString()));
    const totalDaysAccessed = uniqueDates.size;

    // Initialize a Map to store the frequency of each date
let dateFrequencyMap = new Map();

    // Loop through sortedReports to count the frequency of each date
    for (let i = 0; i < sortedReports.length; i++) {
        const reportDate = new Date(sortedReports[i].date).toDateString(); // Convert to date string for comparison
        if (dateFrequencyMap.has(reportDate)) {
            // If the date is already in the map, increment its frequency
            dateFrequencyMap.set(reportDate, dateFrequencyMap.get(reportDate) + 1);
        } else {
            // If the date is not in the map, add it with frequency 1
            dateFrequencyMap.set(reportDate, 1);
        }
    }

    // Find the maximum frequency
    let maxFrequency = 0;
    for (let frequency of dateFrequencyMap.values()) {
        if (frequency > maxFrequency) {
            maxFrequency = frequency;
        }
    }


  return (
    <section className="reportsect">
        <div className="activitycont">
            <h3>Activity Summary</h3>
            <div className="cardssec">
                <div className="card">
                    <img className="clock" src={clock} alt="hours focused"/>
                    <div className="cardno1">{totalHours.toFixed(2)}</div>
                    <p className="cardtext">hours passed</p>
                </div>
                <div className="card">
                    <img className="clock" src={calendar} alt="calendar"/>
                    <div className="cardno">{totalDaysAccessed}</div>
                    <p className="cardtext">days accessed</p>
                </div>
                <div className="card">
                    <img className="clock" src={sun} alt="streak"/>
                    <div className="cardno">{maxFrequency}</div>
                    <p className="cardtext">activity streak</p>
                </div>
            </div>
        </div>
        <div className="logcont">
            <h3>Activity Log </h3>
            <div class="dropdown">
                <div class="dropbtn">Category</div>
                <div class="dropdown-content">
                    <a href="#" onClick={() => handleCategoryChange('All')}>All</a>
                    {categories.map((category, index) => (
                        <a href="#" key={index} onClick={() => handleCategoryChange(category)}>{category}</a>
                    ))}
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
                                <th style={{width:'15%'}}>Project/Task</th>
                                <th style={{width:'20%'}}>Time</th>
                                <th style={{width:'15%'}}>Category</th>
                                <th style={{width:'35%'}}>Description</th>
                            </tr>
                            <tr className="trspacer"></tr>
                        </thead>
                        <tbody>
                            {selectedCategory === 'All' ? sortedReports.map((report, index) => (
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
                                    )) : filteredReports.map((report, index) => (
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
                                    ))
                            }
                        </tbody>  
                    </table>
                </div>  
            </div>
        </div>
    </section>
  );
}
