
import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
const LogoutButton = () => {
  const history = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!(location.state && location.state.id));
  const handleLogout = () => {
    

    // Redirect to login page
    setIsLoggedIn(false);
    localStorage.removeItem('loggedInEmail');
    history('/login');
  };

  return (
    <button onClick={handleLogout} className="btn btn-outline-dark m-2">
      <i className="fa fa-sign-out-alt mr-1"></i> Logout
    </button>
    
  );
};

export default LogoutButton;
