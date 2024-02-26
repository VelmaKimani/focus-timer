import { createContext, useState, useEffect, useCallback } from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";

export const UserContext = createContext()

export default function UserProvider({children}) {

  const [authToken, setAuthToken] = useState('');

  const [user, setUser] = useState([]);
  const [userData, setUserData]= useState([])

  const navigate = useNavigate();


  const fetchUserDetails = useCallback(() => {
    // Fetch user details using authToken
    fetch('/api/protected', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          throw new Error('Unauthorized');
        } else {
          throw new Error('Error fetching user details');
        }
      })
      .then((userData) => setUser(userData))
      .catch((error) => console.error('Error fetching user details:', error));
  }, [authToken]);
  
  const fetchUserById = useCallback((userId) => {
    fetch(`/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching user details');
        }
      })
      .then((userData) => setUserData(userData))
      .catch((error) => console.error('Error fetching user details:', error));
  }, [authToken]);

  useEffect(() => {
    console.log(user); // Log user details whenever the user state changes
  }, [user]);

  useEffect(() => {
    // Fetch user details if authToken exists in sessionStorage
    if (authToken) {
      fetchUserDetails();

    }
  }, [authToken, fetchUserDetails]);

  useEffect(() => {
    if (authToken && user && user.logged_in_as) {
      fetchUserById(user.logged_in_as);
    }
  }, [authToken, user, fetchUserById]);

  function Signup(name, email, password) {
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Parse JSON response
        } else {
          return res.json().then((data) => {
            throw new Error(data.message || 'Failed to sign up');
          });
        }
      })
      .then((data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your account has been created, login.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/login');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          text: error.message || 'Something went wrong!',
        });
      });
  }

  function Login(name, password) {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 401) {
        throw new Error('Invalid credentials');
      } else {
        throw new Error('Login failed');
      }
    })
    .then((response) => {
      sessionStorage.setItem('authToken', response.token);
      setAuthToken(response.token);
      fetchUserDetails();// Fetch user details after successful login
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login successful.',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/')
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        text: error.message,
      });
    });

  }
  function Logout(){
    fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (res.ok) {
        sessionStorage.removeItem('authToken'); 
        setAuthToken(''); // Clear authToken state
        setAuthToken('');
        setUser(null); // Clear user details
        navigate('/login'); // Redirect to the login page after logout
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logged out successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error('Logout failed');
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        text: error.message,
      });
    });
  }

  const contextData={Signup,Login,Logout, userData,user,authToken, setAuthToken}


  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>  )
}