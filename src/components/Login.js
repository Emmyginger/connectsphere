import React, { useState } from 'react';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [occupation, setOccupation] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => setProfilePic(reader.result);
    }
  };

  const loginToApp = (e) => {
    e.preventDefault();
    if (!name || !title || !occupation) {
      return alert('Please fill in all required fields!');
    }
    onLogin(name, title, occupation, profilePic);
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__logo">Connect<span>Sphere</span></h1>
        <form className="login__form" onSubmit={loginToApp}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name (required)" type="text" />
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title (e.g., Software Engineer)" type="text" />
          <input value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="Occupation (e.g., Tech)" type="text" />
          <label htmlFor="file-upload">{profilePic ? 'Image Selected!' : 'Upload Profile Picture'}</label>
          <input id="file-upload" type="file" onChange={handleFileChange} accept="image/*" />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;