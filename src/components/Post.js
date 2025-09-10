import React, { useState } from 'react';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import MessageIcon from '@mui/icons-material/Message';

const PostButton = ({ Icon, title, color, onClick }) => (
  <div onClick={onClick} className="inputOption">
    <Icon style={{ color }} /> <h4>{title}</h4>
  </div>
);

function Post({ user, postData, onAddToNetwork, onRemoveFromNetwork, onLike, onComment, onSendMessage }) {
  const [comment, setComment] = useState('');
  const isSelf = user.name === postData.name;
  const isInNetwork = user.network.some(p => p.name === postData.name);

  const handleNetworkClick = () => {
    if (isInNetwork) onRemoveFromNetwork(postData.name);
    else onAddToNetwork({ name: postData.name, photoUrl: postData.photoUrl });
  };

  const sendComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onComment(postData.id, comment);
    setComment('');
  };

  const handleMessageClick = () => {
    const messageText = prompt(`Send a message to ${postData.name}:`);
    if (messageText && messageText.trim()) {
      onSendMessage(postData.name, messageText);
      alert("Message sent!");
    }
  };

  return (
    <div className="post">
      <div className="post__header">
        <img src={postData.photoUrl} alt="" className="post__avatar" />
        <div className="post__info">
          <h2>{postData.name}</h2>
          <p>{postData.description}</p>
        </div>
        {!isSelf && (
          <button className="post__message-btn" onClick={handleMessageClick} title={`Message ${postData.name}`}>
            <MessageIcon />
          </button>
        )}
      </div>
      <div className="post__body">
        <p>{postData.message}</p>
        {postData.postImageUrl && <img src={postData.postImageUrl} alt="Post content" className="post__image" />}
        {postData.postVideoUrl && <video src={postData.postVideoUrl} controls className="post__video" />}
      </div>
      <div className="post__buttons">
        <PostButton 
          Icon={ThumbUpAltOutlinedIcon} 
          title={`Like (${postData.likes})`} 
          color={postData.isLiked ? 'var(--accent-color)' : 'var(--secondary-color)'}
          onClick={() => onLike(postData.id)}
        />
        <PostButton Icon={ChatOutlinedIcon} title="Comment" color="var(--secondary-color)" />
        
        {!isSelf && (
          <PostButton 
            Icon={isInNetwork ? PersonRemoveIcon : PersonAddIcon}
            title={isInNetwork ? "Remove network" : "Add to network"}
            color={isInNetwork ? "#E53E3E" : "var(--secondary-color)"}
            onClick={handleNetworkClick}
          />
        )}
      </div>
      <div className="post__comments">
        {postData.comments.map((c, index) => (
          <div key={index} className="post__comment"><p><strong>{c.user}</strong>{c.text}</p></div>
        ))}
        <form onSubmit={sendComment} className="post__commentForm">
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..."/>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Post;