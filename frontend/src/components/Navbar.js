import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, Switch, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileDropdown from "./ProfileDropdown"; 
import './Navbar.css';
import LoginModal from './LoginModal';
import logo from '../assets/logo.jpg';
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = ({ toggleMode, mode }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleAuthChange = () => {};

    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('authChange', handleAuthChange); 

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); 

    setIsLoginOpen(true); 
    handleProfileClose(); 
  };

  return (
    <AppBar position="fixed" className="navbar" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Link
            to="/"
            className="navbar-home-link"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <img src={logo} alt="Indica Logo" className="navbar-logo" />
            <Typography variant="h6" className="navbar-title" sx={{ ml: 1 }}>
              Indica Portal
            </Typography>
          </Link>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center" className="navbar-stack">
          <Button component={Link} to="/" className="navbar-button">Home</Button>
          <Button component={Link} to="/search" className="navbar-button">University Search</Button>
          <Button component={Link} to="/scholarships" className="navbar-button">Scholarships</Button>
          <Button component={Link} to="/statistics" className="navbar-button">Statistics</Button>
          <Button component={Link} to="/courses" className="navbar-button">Courses</Button>

          {!user ? (
            <Button className="navbar-button" onClick={() => setIsLoginOpen(true)}>
              Login
            </Button>
          ) : (
            <>
              <IconButton onClick={handleProfileClick} className="navbar-icon">
                <AccountCircleIcon />
              </IconButton>
              <ProfileDropdown
                anchorEl={anchorEl}
                onClose={handleProfileClose}
                onLogout={handleLogout} 
              />
            </>
          )}

          <LoginModal
            open={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onLoginSuccess={() => setIsLoginOpen(false)} 
          />

          <Stack direction="row" alignItems="center" spacing={1} className="navbar-mode">
            <WbSunnyIcon />
            <Switch checked={mode === 'dark'} onChange={toggleMode} />
            <DarkModeIcon />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
