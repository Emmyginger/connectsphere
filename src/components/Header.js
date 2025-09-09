import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Simple HeaderOption component for reusability
const HeaderOption = ({ Icon, avatar, title, onClick }) => (
  <div onClick={onClick} className="headerOption">
    {Icon && <Icon />}
    {avatar && <img src={avatar} alt="avatar" className="headerOption__avatar" />}
    <h3 className="headerOption__title">{title}</h3>
  </div>
);

function Header({ user, onLogout }) {
  return (
    <div className="header">
      <div className="header__content">
        <div className="header__left">
          <div className="header__logo">
            Connect<span>Sphere</span>
          </div>
        </div>
        <div className="header__right">
          <HeaderOption Icon={HomeIcon} title="Home" />
          <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
          <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
          <HeaderOption Icon={ChatIcon} title="Messaging" />
          <HeaderOption Icon={NotificationsIcon} title="Notifications" />
          <HeaderOption
            avatar={user?.photoURL}
            title="me"
            onClick={onLogout}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;