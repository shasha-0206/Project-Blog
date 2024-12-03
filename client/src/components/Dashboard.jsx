import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import {
  BsFillBellFill,
  BsChatDotsFill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsMenuButtonWideFill,
  BsBoxArrowRight,
} from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [recentComments, setRecentComments] = useState([]);

  const navigate = useNavigate();

  const OpenSidebar = () => setOpenSidebarToggle(!openSidebarToggle);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '/';
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Session expired. Please log in again.');
        navigate('/');
        return;
      }

      try {
        const [commentsRes, postsRes, recentRes] = await Promise.all([
          axios.get('http://localhost:3000/api/user/comments', { headers: { 'auth-token': token } }),
          axios.get('http://localhost:3000/api/user/posts', { headers: { 'auth-token': token } }),
          axios.get('http://localhost:3000/api/user/recent-comments', { headers: { 'auth-token': token } }),
        ]);

        setTotalComments(commentsRes.data.totalComments);
        setTotalPosts(postsRes.data.totalPosts);
        setRecentComments(recentRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Toaster position="top-right" />
      <style>
        {`
          .dashboard-container {
            display: grid;
            grid-template-areas: 'sidebar main';
            grid-template-columns: 260px 1fr;
            height: 100vh;
            font-family: 'Montserrat', sans-serif;
            background-color: white;
          }
          #sidebar {
            grid-area: sidebar;
            background-color: #f8f9fa;
            border-right: 1px solid #e0e0e0;
            padding: 15px;
            transition: transform 0.3s;
          }
          #sidebar.sidebar-responsive {
            position: absolute;
            z-index: 12;
            transform: translateX(-100%);
          }
          .sidebar-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .sidebar-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .sidebar-list-item {
            padding: 12px 10px;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            transition: background-color 0.3s;
          }
          .sidebar-list-item:hover {
            background-color: #e9ecef;
          }
          .sidebar-list-item .icon {
            margin-right: 10px;
            font-size: 18px;
          }
          .sidebar-list-item a {
            text-decoration: none;
            color: #212529;
            display: flex;
            align-items: center;
          }
          .main-container {
            grid-area: main;
            padding: 20px;
            overflow-y: auto;
          }
          .main-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
          }
          .card {
            background-color: #343a40;
            color: white;
            padding: 15px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition: transform 0.3s;
          }
          .card:hover {
            transform: translateY(-5px);
          }
          .card-inner {
            display: flex;
            justify-content: space-between;
            width: 100%;
            font-size: 16px;
          }
          .recent-comments {
            margin-top: 20px;
            background-color: #343a40;
            color: white;
            padding: 15px;
            border-radius: 8px;
          }
          .recent-comments table {
            width: 100%;
            margin-top: 10px;
            border-collapse: collapse;
          }
          .recent-comments th, .recent-comments td {
            padding: 8px;
            border-bottom: 1px solid #495057;
          }
          .recent-comments th {
            font-weight: 600;
          }
        `}
      </style>

      {/* Sidebar */}
      <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <Link to="/">
              <BsFillArchiveFill className="icon" /> Home
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="/MyPosts">
              <BsFillGrid3X3GapFill className="icon" /> My Posts
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="/profile">
              <BsMenuButtonWideFill className="icon" /> Profile
            </Link>
          </li>
          <li className="sidebar-list-item" onClick={handleLogout}>
            <BsBoxArrowRight className="icon" /> Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-container">
        <h3>DASHBOARD</h3>
        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h4>TOTAL COMMENTS</h4>
              <BsChatDotsFill />
            </div>
            <h2>{totalComments}</h2>
          </div>
          <div className="card">
            <div className="card-inner">
              <h4>TOTAL POSTS</h4>
              <BsFillBellFill />
            </div>
            <h2>{totalPosts}</h2>
          </div>
        </div>
        <div className="recent-comments">
          <h4>Recent Comments</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentComments.map((comment, index) => (
                <tr key={index}>
                  <td>{comment.username}</td>
                  <td>{comment.text}</td>
                  <td>{new Date(comment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;