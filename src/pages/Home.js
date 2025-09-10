import React from 'react';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';

function Home({ user, onAddToNetwork }) {
  return (
    <>
      <Sidebar user={user} />
      <Feed user={user} onAddToNetwork={onAddToNetwork} />
    </>
  );
}

export default Home;