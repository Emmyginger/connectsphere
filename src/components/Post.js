import React from 'react';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const PostButton = ({ Icon, title, color, onClick }) => (
  <div onClick={onClick} className="inputOption">
    <Icon style={{ color }} /> <h4>{title}</h4>
  </div>
);

function Post({ user, postData, onAddToNetwork, onRemoveFromNetwork }) {
  const isSelf = user.name === postData.name;
  const isInNetwork = user.network.some(p => p.name === postData.name);

  const handleNetworkClick = () => {
    if (isInNetwork) {
      onRemoveFromNetwork(postData.name);
    } else {
      onAddToNetwork({ name: postData.name, photoUrl: postData.photoUrl });
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
      </div>
      <div className="post__body">
        <p>{postData.message}</p>
        {postData.postImageUrl && <img src={postData.postImageUrl} alt="Post content" className="post__image" />}
        {postData.postVideoUrl && <video src={postData.postVideoUrl} controls className="post__video" />}
      </div>
      <div className="post__buttons">
        <PostButton Icon={ThumbUpAltOutlinedIcon} title="Like" color="#4A5568" />
        <PostButton Icon={ChatOutlinedIcon} title="Comment" color="#4A5568" />
        <PostButton Icon={ShareOutlinedIcon} title="Share" color="#4A5568" />
        {!isSelf && (
          <PostButton 
            Icon={isInNetwork ? PersonRemoveIcon : PersonAddIcon}
            title={isInNetwork ? "Remove from network" : "Add to network"}
            color={isInNetwork ? "#E53E3E" : "#4A5568"}
            onClick={handleNetworkClick}
          />
        )}
      </div>
    </div>
  );
}

export default Post;