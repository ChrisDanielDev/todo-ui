import React, {useState, useEffect} from "react";
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import TodoDashboard from "./pages/TodoDashboard";
import {User} from "./types/user";
// import {getAccessToken, getStoredAccessToken, setAccessToken} from "./utils/token";
import {getStoredAccessToken, setAccessToken} from "./utils/token";
import {getUser, handleLogout, loginUser, registerUser} from "./utils/api";
import LogoutButton from "./components/LogoutButton";

function App() {
  const [user, setUser]=useState<User | null>(null);
  const navigate=useNavigate();

  useEffect(() => {
    // const accessToken = getAccessToken();
    const accessToken=getStoredAccessToken();
    if (accessToken) {
      // If there is an access token in local storage, use it to fetch the user's data
      getUser()
        .then((userData) => {
          if (!userData) {
            return;
          }
          setUser(userData);
        })
        .catch(() => {
          // If there is an error fetching the user's data, remove the access token from local storage
          setAccessToken("");
        });
    }
  }, []);

  const handleLogin=(email: string, password: string) => {
    return loginUser(email, password)
      .then((accessToken) => {
        if (!accessToken) {
          throw new Error('Email or Password is Invalid');
        }
        setAccessToken(accessToken);
        getUser().then((userData) => {
          setUser(userData);
        });
      });
  };

  const handleSignup=(name: string, email: string, password: string) => {
    return registerUser(name, email, password)
      .then((email) => {
        alert('You account has been created with this email' + email);
        navigate('/login');
      });
  };

  const handleOnLogoutButtonClick = async () => {
    await handleLogout();
    setUser(null);
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginForm handleLogin={handleLogin} /> : <Navigate to="/todo" />} />
      <Route path="/signup" element={!user ? <SignupForm handleSignup={handleSignup} /> : <Navigate to="/todo" />} />
      <Route path="/todo" element={user ? <>
        <TodoDashboard />
        <LogoutButton onLogout={handleOnLogoutButtonClick} />
      </> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
