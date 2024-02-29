import { createContext, useState, useEffect, useContext } from 'react'
import Swal from "sweetalert2";
import {UserContext} from './UserContext'


export const ReportContext= createContext()


export default function ReportProvider({children}) {

  const [reports, setReports] = useState([])
  const { user, authToken } = useContext(UserContext);

  
  const getReports = () => {
    if (user && user.logged_in_as){
      fetch(`/get_reports/${user.logged_in_as}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response)=>{
          if (response.ok){
            return response.json();
          } else{
            throw new Error('Failed to fetchReport');
          }

        })
        .then((data)=>{
          console.log('Reports fetched successfully:', data);
          setReports(data.reports)

        })
        .catch ((error) => {
          console.error('Error fetching report:', error);
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to fetch reports!',
              footer: error.message
          })
        });
    }
  }
  

  useEffect(() => {
    if (authToken && user){
      getReports()
    }
  }, [authToken, user,])

  useEffect(() => {
    return () => setReports([]);
  }, [authToken, user]);

  


  const contextData={reports, getReports}

  return (
    <ReportContext.Provider value={contextData}>{children}</ReportContext.Provider>)
}
