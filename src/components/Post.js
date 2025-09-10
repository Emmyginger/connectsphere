import React from 'react';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Reusable Button component
const PostButton = ({ Icon, title, color, onClick }) => (
  <div onClick={onClick} className="inputOption">
    <Icon style={{ color: color }} />
    <h4>{title}</h4>
  </div>
);

function Post({ postData, onAddToNetwork }) {
  return (
    <div className="post">
      <div className="post__header">
        <img src={postData.photoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${postData.name}`} alt="" className="post__avatar" />
        <div className="post__info">
          <h2>{postData.name}</h2>
          <p>{postData.description}</p>
        </div>
      </div>

      <div className="post__body">
        <p>{postData.message}</p>
        {postData.postImageUrl && <img src={postData.postImageUrl} alt="Post content" className="post__image" />}
      </div>

      <div className="post__buttons">
        <PostButton Icon={ThumbUpAltOutlinedIcon} title="Like" color="#4A5568" />
        <PostButton Icon={ChatOutlinedIcon} title="Comment" color="#4A5568" />
        <PostButton Icon={ShareOutlinedIcon} title="Share" color="#4A5568" />
        <PostButton Icon={PersonAddIcon} title="Add to network" color="#4A5568" onClick={onAddToNetwork} />
      </div>
    </div>
  );
}

export default Post;