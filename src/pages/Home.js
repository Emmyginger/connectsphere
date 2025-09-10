import React from 'react';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';

function Home({ user, onAddToNetwork, onRemoveFromNetwork }) {
  return (
    <>
      <Sidebar user={user} />
      <Feed user={user} onAddToNetwork={onAddToNetwork} onRemoveFromNetwork={onRemoveFromNetwork} />
    </>
  );
}

export default Home;