import React, { useState } from 'react';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

// Simple InputOption component for reusability
const InputOption = ({ Icon, title, color, onClick, isLiked }) => (
  <div onClick={onClick} className={`inputOption ${isLiked ? 'liked' : ''}`}>
    <Icon style={{ color: isLiked ? '#FF7F50' : color }} />
    <h4>{title}</h4>
  </div>
);

function Post({ postData, onLike, onComment }) {
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    if (!isLiked) { // Prevent multiple likes from the same user session
        onLike();
        setIsLiked(true);
    }
  };

  const sendComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onComment(comment);
    setComment('');
  };

  return (
    <div className="post">
      <div className="post__header">
        <img src={postData.photoUrl} alt="" className="post__avatar" />
        <div className="post__info">
          <h2>{postData.name}</h2>
          <p>{postData.description}</p>
        </div>
      </div>

      <div className="post__body">
        <p>{postData.message}</p>
      </div>

      <div className="post__buttons">
        <InputOption
          Icon={ThumbUpAltOutlinedIcon}
          title={`Like (${postData.likes})`}
          color="#4A5568"
          onClick={handleLikeClick}
          isLiked={isLiked}
        />
        <InputOption Icon={ChatOutlinedIcon} title="Comment" color="#4A5568" />
        <InputOption Icon={ShareOutlinedIcon} title="Share" color="#4A5568" />
        <InputOption Icon={SendOutlinedIcon} title="Send" color="#4A5568" />
      </div>

      <div className="post__comments">
        {postData.comments.map((c, index) => (
          <div key={index} className="post__comment">
            <p>
              <strong>{c.user}</strong>
              {c.text}
            </p>
          </div>
        ))}
        <form onSubmit={sendComment} className="post__commentForm">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Post;