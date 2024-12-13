import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const hideMyPosts = location.pathname === '/Dashboard';
    const hideLogout = location.pathname === '/Dashboard';

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    return (
        <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top mb-2">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#4d718e">
                        <path d="M560-570.67v-54.66q33-14 67.5-21t72.5-7q26 0 51 4t49 10v50.66q-24-9-48.5-13.5t-51.5-4.5q-38 0-73 9.5t-67 26.5Zm0 220V-406q33-13.67 67.5-20.5t72.5-6.83q26 0 51 4t49 10v50.66q-24-9-48.5-13.5t-51.5-4.5q-38 0-73 9t-67 27Zm0-110v-54.66q33-14 67.5-21t72.5-7q26 0 51 4t49 10v50.66q-24-9-48.5-13.5t-51.5-4.5q-38 0-73 9.5t-67 26.5Zm-45.33 201.34q48-23.67 94.83-35.5 46.83-11.84 98.5-11.84 37.33 0 75.83 6t69.5 16.67v-418q-33.66-16-70.71-23.67-37.05-7.66-74.62-7.66-51.67 0-100.67 15t-92.66 43v416ZM481.33-160q-50-38-108.66-58.67Q314-239.33 252-239.33q-38.36 0-75.35 9.66-36.98 9.67-72.65 25-22.4 11-43.2-2.33Q40-220.33 40-245.33v-469.34q0-13.66 6.5-25.33Q53-751.67 66-758q43.67-21 90.5-31.5T252-800q61.33 0 119.5 16.33 58.17 16.34 109.83 49.67 51-33.33 108.5-49.67Q647.33-800 708-800q48.79 0 95.23 10.5 46.44 10.5 90.1 31.5 13 6.33 19.84 18 6.83 11.67 6.83 25.33v469.34q0 26.26-21.5 39.96t-43.17.7q-35-16-71.98-25.33-36.99-9.33-75.35-9.33-62 0-119.33 21-57.34 21-107.34 58.33Z" />
                    </svg>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link nav-ele" to="/">BlogBliss</Link>
                        <Link className="nav-link nav-ele" to="/">Explore</Link>
                        <Link className="nav-link nav-ele" to="/Editor">Add New Post</Link>
                        {isLoggedIn && <Link className="nav-link nav-ele" to="/Dashboard">Dashboard</Link>}
                        {isLoggedIn && !hideMyPosts && (
                            <Link className="nav-link nav-ele" to="/MyPosts">My Posts</Link>
                        )}
                    </div>

                    <div className="dropdown">
                        <button
                            className="btn btn-outline-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Menu
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end bg-light" style={{ backgroundColor: '#f8f9fa' }}>
                            <li><Link className="dropdown-item" to="/about">About Us</Link></li>
                            <li><Link className="dropdown-item" to="/feedback">Feedback</Link></li>
                            {!isLoggedIn ? (
                                <>
                                    <li><Link className="dropdown-item" to="/signup">Sign Up</Link></li>
                                    <li><Link className="dropdown-item" to="/signin">Login</Link></li>
                                </>
                            ) : (
                                <>
                                    {!hideLogout && (
                                        <li>
                                            <span className="dropdown-item" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                                                Logout
                                            </span>
                                        </li>
                                    )}
                                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
