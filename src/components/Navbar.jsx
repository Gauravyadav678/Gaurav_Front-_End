import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LogoutButton from '../pages/LogOut';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      setIsLoggedIn(!!(location.state && location.state.id));
     
    }, [location.state]);
     
    const handleLogout = () => {
        // Perform any necessary logout actions
        // For example, clearing user data, redirecting to login, etc.
        // ...
    
        // Redirect to login page
        localStorage.removeItem('loggedInEmail');
        // navigate('/login');
      };
   
        
         const state = useSelector(state => state.handleCart)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">Welcome {localStorage.getItem('loggedInEmail')}</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/hm">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                      
                    </ul>
                    <div className="buttons text-center">
                        {!localStorage.getItem('loggedInEmail') && <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>}
                        {localStorage.getItem('loggedInEmail') && <LogoutButton handleLogout={handleLogout} />}
                        {!localStorage.getItem('loggedInEmail') && <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>}
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar