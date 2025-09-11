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
    { 
      id: 1, 
      name: 'Satya Nadella', 
      description: 'CEO, Microsoft', 
      message: 'Our industry does not respect tradition — it only respects innovation. We are focused on empowering every person and organization to achieve more.', 
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg/500px-MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg', 
      postImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Microsoft_Linux.jpg/500px-Microsoft_Linux.jpg', 
      likes: 256, 
      isLiked: false, 
      comments: [{user: 'Tim Cook', text: 'Great mission, Satya.'}] 
    },
    { 
      id: 2, 
      name: 'Serena Williams', 
      description: 'Athlete & Venture Capitalist, Serena Ventures', 
      message: 'Excited about the latest seed round for a groundbreaking health-tech startup. Investing in the future is the ultimate grand slam. #VentureCapital #Tech', 
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Serena_Williams_at_2013_US_Open.jpg/330px-Serena_Williams_at_2013_US_Open.jpg', 
      postImageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1032', 
      likes: 431, 
      isLiked: false, 
      comments: [] 
    },
    { 
      id: 3, 
      name: 'Bill Gates', 
      description: 'Co-chair, Bill & Melinda Gates Foundation', 
      message: "Just returned from a trip focused on global health initiatives. The progress in vaccine distribution is inspiring, but there's still so much work to be done.", 
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bill_Gates_at_the_European_Commission_-_2025_-_P067383-987995_%28cropped%29.jpg/500px-Bill_Gates_at_the_European_Commission_-_2025_-_P067383-987995_%28cropped%29.jpg', 
      postImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Foreign_Secretary_David_Cameron_attends_COP28_%2853376969086%29.jpg/500px-Foreign_Secretary_David_Cameron_attends_COP28_%2853376969086%29.jpg', 
      likes: 512, 
      isLiked: false, 
      comments: [] 
    },
    { 
      id: 4, 
      name: 'Susan Wojcicki', 
      description: 'Former CEO, YouTube', 
      message: 'The creativity I see from creators around the world continues to amaze me. Supporting the creator economy is essential for the future of media.', 
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=872', 
      postImageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=774', 
      likes: 389, 
      isLiked: false, 
      comments: [{user: 'Satya Nadella', text: 'Completely agree.'}] 
    },
    { 
      id: 5, 
      name: 'Jensen Huang', 
      description: 'Founder & CEO, NVIDIA', 
      message: "The future of computing is accelerated. Incredible to see how generative AI is transforming every industry. The next industrial revolution is underway.", 
      photoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=774', 
      postImageUrl: 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      likes: 678, 
      isLiked: false, 
      comments: [] 
    },
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