import React, { useState } from 'react';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [picUrl, setPicUrl] = useState('');

  const loginToApp = (e) => {
    e.preventDefault();
    if (!name || !title) {
      return alert('Please enter your full name and title!');
    }
    // Call the onLogin function passed from App.js
    onLogin(name, title, picUrl);
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__logo">
          Connect<span>Sphere</span>
        </h1>
        <form className="login__form" onSubmit={loginToApp}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name (required)"
            type="text"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title (required)"
            type="text"
          />
          <input
            value={picUrl}
            onChange={(e) => setPicUrl(e.target.value)}
            placeholder="Profile pic URL (optional)"
            type="text"
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;