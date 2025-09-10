import React, { useState, useEffect, useRef } from 'react';
import Post from './Post';
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';


const InputOption = ({ Icon, title, color, htmlFor }) => (
  <label htmlFor={htmlFor} className="inputOption">
    <Icon style={{ color }} /> <h4>{title}</h4>
  </label>
);

const initialPosts = [
    { id: 1, name: 'Elon Musk', description: 'CEO, SpaceX & Tesla', message: 'To the moon! 🚀', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/USAFA_Hosts_Elon_Musk_%28Image_1_of_17%29_%28cropped%29.jpg/500px-USAFA_Hosts_Elon_Musk_%28Image_1_of_17%29_%28cropped%29.jpg', postImageUrl: 'https://www.spacex.com/static/images/share.jpg', likes: 102, isLiked: false, comments: [{user: 'Jeff Bezos', text: 'See you there!'}] },
    { id: 2, name: 'Jeff Bezos', description: 'Founder, Amazon', message: 'Just launched a new AWS feature. It’s always Day 1!', photoUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY2NzA3ODE3OTgwMzcyMjY5/jeff-bezos-attends-the-lord-of-the-rings-the-rings-of-power-world-premiere-at-culver-studios-on-august-15-2022-in-culver-city-california-photo-by-kevin-winter_getty-images.jpg', postImageUrl: 'https://m.media-amazon.com/images/G/01/sell/images/Anker-01.jpg', likes: 88, isLiked: false, comments: [] },
    { id: 3, name: 'Ada Lovelace', description: 'The first programmer', message: 'Thinking about the Analytical Engine today. The potential for computing is limitless.', photoUrl: 'https://cdn.britannica.com/49/187349-050-2522541E/Ada-Lovelace-prop-oil-painting-Alfred-Edward-1852.jpg', postImageUrl: 'https://miro.medium.com/v2/resize:fit:1024/1*bT4na0KVXzN4_0i_T64JRw.jpeg', likes: 150, comments: [] },
    { id: 4, name: 'Marie Curie', description: 'Nobel Prize in Physics and Chemistry', message: 'Exploring the properties of radium. The scientific journey never ends.', photoUrl: 'https://cdn.britannica.com/79/5379-050-446A4350/Marie-Curie-1920.jpg', postImageUrl: 'https://www.nobelprize.org/images/marie-curie-12870-content-mobile-1x-2.jpg', likes: 210, comments: [] },
    { id: 5, name: 'Satya Nadella', description: 'CEO, Microsoft', message: 'Empowering every person and every organization on the planet to achieve more. That is our mission.', photoUrl: 'https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4Gvlt_400x400.jpg', postImageUrl: 'https://news.microsoft.com/wp-content/uploads/prod/2021/05/Microsoft-Build-2021-Day-2-Satya-Nadella-scaled.jpg', likes: 95, comments: [] },
];

function Feed({ user, onAddToNetwork, onRemoveFromNetwork, onSendMessage }) {
  const [posts, setPosts] = useState(() => JSON.parse(localStorage.getItem('posts')) || initialPosts);
  const [input, setInput] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [postVideo, setPostVideo] = useState(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

    const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        if (fileType === 'image') setPostImage(reader.result);
        if (fileType === 'video') setPostVideo(reader.result);
    };
  };
  
  const sendPost = (e) => {
    e.preventDefault();
    if (!input.trim() && !postImage && !postVideo) return;
    const newPost = {
      id: Date.now(),
      name: user.name,
      description: user.title,
      message: input,
      photoUrl: user.photoURL,
      postImageUrl: postImage,
      postVideoUrl: postVideo,
      likes: 0,
      isLiked: false,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    // Reset form
    setInput(''); setPostImage(null); setPostVideo(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleComment = (postId, commentText) => {
    setPosts(posts.map(post => 
      post.id === postId
        ? { ...post, comments: [...post.comments, { user: user.name, text: commentText }] }
        : post
    ));
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        {/* Input Form Here... */}
        <div className="feed__input">
          <CreateIcon />
          <form onSubmit={sendPost}>
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Start a post" />
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" htmlFor="post-image-upload"/>
          <input id="post-image-upload" type="file" ref={imageInputRef} onChange={(e) => handleFileChange(e, 'image')} accept="image/*" style={{display: 'none'}} />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#7FC15E" htmlFor="post-video-upload"/>
          <input id="post-video-upload" type="file" ref={videoInputRef} onChange={(e) => handleFileChange(e, 'video')} accept="video/*" style={{display: 'none'}} />
          
        </div>
      </div>
      {posts.map((post) => (
        <Post
          key={post.id}
          user={user}
          postData={post}
          onAddToNetwork={onAddToNetwork}
          onRemoveFromNetwork={onRemoveFromNetwork}
          onLike={handleLike}
          onComment={handleComment}
          onSendMessage={onSendMessage}
        />
      ))}
    </div>
  );
}

export default Feed;