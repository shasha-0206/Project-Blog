import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const MyPosts = () => {

  const navigate = useNavigate();
  // For storing posts fetched from the backend
  const [posts, setPosts] = useState([]);

  // For loading state
  const [loading, setLoading] = useState(true);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`, { state: { fromMyPosts: true } });  // adding state to differentiate between myposts and home page
    // for rendering edit or delete 
  };

  // Fetch posts created by the logged-in user
  const fetchPosts = async () => {
    try {
      // Get the authentication token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No authentication token found');
        setLoading(false);
        return;
      }

      // Make the API call to fetch posts
      const response = await axios.post('http://localhost:3000/myposts', 
        {},
        {
          headers: {
            'auth-token': token,
          }
        }
      );

      // Update the posts state with the fetched data
      setPosts(response.data.posts);
      setLoading(false); // Set loading to false once the data is fetched
    } catch (error) {
      toast.error('Failed to fetch posts');
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Only run once when the component mounts

  // If the data is still loading, show the loading animation
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <Toaster />
      <h3>My Posts</h3>
      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="card col post-card">
              <img
                src={`data:image/jpeg;base64,${post.image}`}
                className="card-img-top"
                alt="post_image"
                style={{ height: '20rem', cursor: 'pointer' }}
                onClick={() => handlePostClick(post._id)}
              />
              <div className="card-body" style={{ cursor: 'pointer' }} onClick={() => handlePostClick(post._id)}>
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content.substring(0, 100)}...</p>
                
              </div>
            </div>
          ))
        ) : (
          <p>No posts found.</p> // Show a message if no posts are available
        )}
      </div>
    </div>
  );
};

export default MyPosts;
