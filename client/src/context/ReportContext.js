import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ReportContext= createContext()


export default function ReportProvider({children}) {

    function fetchReport(){

    }


    const contextData={fetchReport}

  return (
    <ReportContext.Provider value={contextData}>{children}</ReportContext.Provider>  )
}
