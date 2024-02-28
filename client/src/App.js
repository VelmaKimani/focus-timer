import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import './App.css';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Login  from './pages/Login';
import Signup from './pages/Signup';
import Report from './pages/Report';
import UpdateTask from './pages/UpdateTask'
import UserProvider from './context/UserContext';
import TasksProvider from './context/TasksContext';
import ReportProvider from './context/ReportContext';


function App() {
  return (
    <Router>
      <UserProvider>
        <TasksProvider>
          <ReportProvider>
              <Routes>
                <Route path="/" element={<Layout/>}>
                  <Route index element={<Home/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="/report" element={<Report/>}/>
                  <Route path="/update/:taskId" element={<UpdateTask/>}/>
                </Route>
              </Routes>
          </ReportProvider>
        </TasksProvider>
      </UserProvider>
    </Router>
    
  );
}

export default App;