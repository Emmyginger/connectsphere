import React, { useState, useEffect } from 'react';
import Post from './Post';
import CreateIcon from '@mui/icons-material/Create';

function Feed({ user }) {
  // We will get posts from localStorage or use a default array
  const initialPosts = JSON.parse(localStorage.getItem('posts')) || [
    {
      id: 1,
      name: 'John Doe',
      description: 'Software Engineer at Google',
      message: 'Excited to launch our new project next week! #React #WebDev',
      photoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=JohnDoe',
      likes: 5,
      comments: [{ user: 'Jane Smith', text: 'This looks amazing!' }],
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [input, setInput] = useState('');

  // Update localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const sendPost = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newPost = {
      id: new Date().getTime(), // Unique ID
      name: user.name,
      description: user.title,
      message: input,
      photoUrl: user.photoURL,
      likes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setInput('');
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId, commentText) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, { user: user.name, text: commentText }],
            }
          : post
      )
    );
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form onSubmit={sendPost}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Start a post"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <Post
          key={post.id}
          postData={post}
          onLike={() => handleLike(post.id)}
          onComment={(commentText) => handleComment(post.id, commentText)}
        />
      ))}
    </div>
  );
}

export default Feed;