import React from 'react';
import Sidebar from '../components/Sidebar';

function MyNetwork({ user }) {
  return (
    <>
      <Sidebar user={user} />
      <div className="networkPage">
        <h1>My Network ({user.network.length})</h1>
        {user.network.length > 0 ? (
          <div className="networkPage__grid">
            {user.network.map((person, index) => (
              <div key={index} className="networkPage__member">
                <img src={person.photoUrl} alt={person.name} />
                <h3>{person.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="networkPage__empty">You haven't added anyone to your network yet.</p>
        )}
      </div>
    </>
  );
}

export default MyNetwork;