import React, { useState } from 'react';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      // Use FileReader to convert image to a base64 string
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProfilePic(reader.result);
      };
    }
  };

  const loginToApp = (e) => {
    e.preventDefault();
    if (!name || !title) {
      return alert('Please enter your full name and title!');
    }
    onLogin(name, title, profilePic);
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
          <label htmlFor="file-upload">
            {profilePic ? 'Image Selected!' : 'Upload Profile Picture'}
          </label>
          <input id="file-upload" type="file" onChange={handleFileChange} accept="image/*" />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;