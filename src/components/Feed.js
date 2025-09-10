import React, { useState, useEffect, useRef } from 'react';
import Post from './Post';
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';

// Reusable InputOption for feed input options
const InputOption = ({ Icon, title, color, onClick, htmlFor }) => (
  <label htmlFor={htmlFor} className="inputOption" onClick={onClick}>
    <Icon style={{ color: color }} />
    <h4>{title}</h4>
  </label>
);

function Feed({ user, onAddToNetwork }) {
  const initialPosts = JSON.parse(localStorage.getItem('posts')) || [
    { id: 1, name: 'Elon Musk', description: 'CEO, SpaceX & Tesla', message: 'To the moon! 🚀', photoUrl: 'https://media.wired.com/photos/592685827034dc5f91bec333/master/w_2560%2Cc_limit/ElonMusk-FA.jpg', postImageUrl: 'https://www.spacex.com/static/images/share.jpg', likes: 102, comments: [] },
    { id: 2, name: 'Jeff Bezos', description: 'Founder, Amazon', message: 'Just launched a new AWS feature. It’s always Day 1!', photoUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY2NzA3ODE3OTgwMzcyMjY5/jeff-bezos-attends-the-lord-of-the-rings-the-rings-of-power-world-premiere-at-culver-studios-on-august-15-2022-in-culver-city-california-photo-by-kevin-winter_getty-images.jpg', postImageUrl: 'https://m.media-amazon.com/images/G/01/sell/images/Anker-01.jpg', likes: 88, comments: [] },
    { id: 3, name: 'Ada Lovelace', description: 'The first programmer', message: 'Thinking about the Analytical Engine today. The potential for computing is limitless.', photoUrl: 'https://cdn.britannica.com/49/187349-050-2522541E/Ada-Lovelace-prop-oil-painting-Alfred-Edward-1852.jpg', postImageUrl: 'https://miro.medium.com/v2/resize:fit:1024/1*bT4na0KVXzN4_0i_T64JRw.jpeg', likes: 150, comments: [] },
    { id: 4, name: 'Marie Curie', description: 'Nobel Prize in Physics and Chemistry', message: 'Exploring the properties of radium. The scientific journey never ends.', photoUrl: 'https://cdn.britannica.com/79/5379-050-446A4350/Marie-Curie-1920.jpg', postImageUrl: 'https://www.nobelprize.org/images/marie-curie-12870-content-mobile-1x-2.jpg', likes: 210, comments: [] },
    { id: 5, name: 'Satya Nadella', description: 'CEO, Microsoft', message: 'Empowering every person and every organization on the planet to achieve more. That is our mission.', photoUrl: 'https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4Gvlt_400x400.jpg', postImageUrl: 'https://news.microsoft.com/wp-content/uploads/prod/2021/05/Microsoft-Build-2021-Day-2-Satya-Nadella-scaled.jpg', likes: 95, comments: [] },
  ];
  
  const [posts, setPosts] = useState(initialPosts);
  const [input, setInput] = useState('');
  const [postImage, setPostImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => setPostImage(reader.result);
    }
  };

  const sendPost = (e) => {
    e.preventDefault();
    if (!input.trim() && !postImage) return;

    const newPost = {
      id: new Date().getTime(),
      name: user.name,
      description: user.title,
      message: input,
      photoUrl: user.photoURL,
      postImageUrl: postImage,
      likes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setInput('');
    setPostImage(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
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
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" htmlFor="post-image-upload"/>
          <input id="post-image-upload" type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{display: 'none'}} />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7FC15E" />
        </div>
      </div>

      {posts.map((post) => (
        <Post
          key={post.id}
          postData={post}
          onAddToNetwork={() => onAddToNetwork({ name: post.name, photoUrl: post.photoUrl })}
        />
      ))}
    </div>
  );
}

export default Feed;