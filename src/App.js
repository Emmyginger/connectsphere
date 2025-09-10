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
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Persist user and theme to localStorage
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
    
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [user, theme]);

  const handleLogin = (name, title, occupation, picDataUrl) => {
    setUser({
      name,
      title,
      occupation,
      photoURL: picDataUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      network: [],
      appliedJobs: [],
    });
  };

  const handleLogout = () => setUser(null);
  
  const toggleTheme = () => setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));

  const addToNetwork = (person) => {
    setUser(prevUser => ({ ...prevUser, network: [...prevUser.network, person] }));
  };

  const removeFromNetwork = (personName) => {
    setUser(prevUser => ({
      ...prevUser,
      network: prevUser.network.filter(p => p.name !== personName)
    }));
  };
  
  const handleApply = (jobId) => {
    setUser(prevUser => {
      if (prevUser.appliedJobs.includes(jobId)) return prevUser;
      return { ...prevUser, appliedJobs: [...prevUser.appliedJobs, jobId] };
    });
  };

  return (
    <Router>
      <div className="app">
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <Header user={user} onLogout={handleLogout} onToggleTheme={toggleTheme} theme={theme} />
            <div className="app__body">
              <Routes>
                <Route path="/" element={
                    <Home 
                        user={user} 
                        onAddToNetwork={addToNetwork} 
                        onRemoveFromNetwork={removeFromNetwork} 
                    />} 
                />
                <Route path="/network" element={<MyNetwork user={user} />} />
                <Route path="/jobs" element={<Jobs user={user} onApply={handleApply} />} />
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