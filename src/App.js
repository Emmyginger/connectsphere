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
  // New state for messages
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('messages')) || {});

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
    
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);

    // Persist messages
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [user, theme, messages]);

  const handleLogin = (name, title, occupation, picDataUrl) => {
    setUser({
      name, title, occupation,
      photoURL: picDataUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      network: [], appliedJobs: [],
    });
  };

  const handleLogout = () => setUser(null);
  const toggleTheme = () => setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));

  const addToNetwork = (person) => {
    setUser(prevUser => {
      // Guard clause: prevent adding yourself
      if (person.name === prevUser.name) {
        alert("You cannot add yourself to your network!");
        return prevUser;
      }
      return { ...prevUser, network: [...prevUser.network, person] };
    });
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

  // New function to handle sending messages
  const handleSendMessage = (recipient, text) => {
    setMessages(prevMessages => {
      const existingConversation = prevMessages[recipient] || [];
      const newConversation = [
        ...existingConversation,
        { sender: 'me', text: text, timestamp: new Date() }
      ];
      return { ...prevMessages, [recipient]: newConversation };
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
                        onSendMessage={handleSendMessage}
                    />} 
                />
                <Route path="/network" element={<MyNetwork user={user} onRemoveFromNetwork={removeFromNetwork} />} />
                <Route path="/jobs" element={<Jobs user={user} onApply={handleApply} />} />
                <Route path="/messaging" element={<Messaging user={user} messages={messages} />} />
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