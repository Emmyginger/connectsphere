import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Login from './components/Login';
import Home from './pages/Home';
import MyNetwork from './pages/MyNetwork';
import Jobs from './pages/Jobs';
import Messaging from './pages/Messaging';
import Notifications from './pages/Notifications';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    // Persist user state to localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleLogin = (name, title, picDataUrl) => {
    setUser({
      name: name,
      title: title,
      photoURL: picDataUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      network: [], // Initialize network for a new user
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Function to add a person to the network
  const addToNetwork = (person) => {
    setUser(prevUser => {
        // Prevent adding duplicates
        if (prevUser.network.some(p => p.name === person.name)) {
            return prevUser;
        }
        return {
            ...prevUser,
            network: [...prevUser.network, person]
        };
    });
  };

  return (
    <Router>
      <div className="app">
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <Header user={user} onLogout={handleLogout} />
            <div className="app__body">
              <Routes>
                <Route path="/" element={<Home user={user} onAddToNetwork={addToNetwork} />} />
                <Route path="/network" element={<MyNetwork user={user} />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/messaging" element={<Messaging />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;