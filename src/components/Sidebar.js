import React from 'react';

function Sidebar({ user }) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80" alt="background" />
        <img src={user.photoURL} alt={user.name} className="sidebar__avatar" />
        <h2>{user.name}</h2>
        <h4>{user.title}</h4>
      </div>
    </div>
  );
}

export default Sidebar;