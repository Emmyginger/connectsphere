import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const NavOption = ({ to, Icon, title }) => (
  <NavLink to={to} className={({ isActive }) => "headerOption" + (isActive ? " active" : "")}>
    {Icon && <Icon />} <h3 className="headerOption__title">{title}</h3>
  </NavLink>
);

function Header({ user, onLogout, onToggleTheme, theme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header">
      <div className="header__content">
        <div className="header__left">
          <Link to="/" className="header__logo">Connect<span>Sphere</span></Link>
        </div>
        <div className="header__right">
          <NavOption to="/" Icon={HomeIcon} title="Home" />
          <NavOption to="/network" Icon={SupervisorAccountIcon} title="My Network" />
          <NavOption to="/jobs" Icon={BusinessCenterIcon} title="Jobs" />
          <NavOption to="/messaging" Icon={ChatIcon} title="Messaging" />
          <NavOption to="/notifications" Icon={NotificationsIcon} title="Notifications" />
          <div onClick={onLogout} className="headerOption">
            <img src={user?.photoURL} alt="avatar" className="headerOption__avatar" />
            <h3 className="headerOption__title">Logout</h3>
          </div>
          <div className="theme-toggle" onClick={onToggleTheme}>
            {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </div>
        </div>
        <div className="header__hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
      {isMenuOpen && (
        <div className="header__mobileMenu">
          <NavOption to="/" Icon={HomeIcon} title="Home" />
          <NavOption to="/network" Icon={SupervisorAccountIcon} title="My Network" />
          <NavOption to="/jobs" Icon={BusinessCenterIcon} title="Jobs" />
          <NavOption to="/messaging" Icon={ChatIcon} title="Messaging" />
          <NavOption to="/notifications" Icon={NotificationsIcon} title="Notifications" />
          <div onClick={onLogout} className="headerOption">
             <img src={user?.photoURL} alt="avatar" className="headerOption__avatar" />
             <h3 className="headerOption__title">Logout</h3>
          </div>
          <div className="headerOption" onClick={onToggleTheme}>
            {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            <h3 className="headerOption__title">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;