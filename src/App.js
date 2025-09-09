import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Login from './components/Login';

function App() {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleLogin = (name, title, picUrl) => {
    setUser({
      name: name,
      title: title,
      photoURL: picUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header user={user} onLogout={handleLogout} />
          <div className="app__body">
            <Sidebar user={user} />
            <Feed user={user} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;