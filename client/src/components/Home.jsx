import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  // for adding new posts to existing posts
  const [posts, setPosts] = useState([]);

  // for error if any 
  const [error, setError] = useState(null);

  // updating section after 6 posts have been loaded
  const [currentPage, setCurrentPage] = useState(1);

  // for loading button
  const [loading, setLoading] = useState(false);
  const [LoadMore, setLoadMore] = useState(false);

  // total posts count from backend
  const [totalPosts, setTotalPosts] = useState(0);

  const navigate = useNavigate();

  // Fetch posts on component mount or when the page changes
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {

        // fetching data from backend
        const response = await axios.get('http://localhost:3000/posts', {
          params: { page: currentPage },
        });

        setPosts(prevPosts => {

          // inside prevPosts we are addind newPosts but before adding we are filtering
          // post => for all post inside fethced data
          // we check if they are same by ther ids 

          const newPosts = response.data.posts.filter(post =>
            !prevPosts.some(existingPost => existingPost._id === post._id)
          );

          // ... used ot spread the arrays and combine old and new array
          return [...prevPosts, ...newPosts];
        });

        // updating total number of post to totalPost
        setTotalPosts(response.data.totalPosts);

      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts');
      }
      finally {
        setLoading(false);  // Set loading to false once the fetch is complete
        setLoadMore(false)
      }
    };

    fetchPosts();
  }, [currentPage]); // Run this effect whenever currentPage changes

  // Navigate to the post details page
  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);  // Navigate to the post details page
  };

  // Load more posts when the button is clicked
  const handleLoadMore = () => {
    setLoadMore(true)
    setCurrentPage(prevPage => prevPage + 1); // Increment the page number
  };

  // for rendering load more button
  const hasMorePosts = posts.length < totalPosts;
  return (
    <div className="container">
      <h3>All Posts</h3>
      {error && <p className="text-danger">{error}</p>}

      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={post._id} className="card col post-card">
              <img
                src={`data:image/jpeg;base64,${post.image}`}
                className="card-img-top"
                alt="post_image"
                style={{ height: '20rem', cursor: 'pointer' }}
                onClick={() => handlePostClick(post._id)}  // On click, navigate to the post details page
              />
              <div className="card-body" style={{ cursor: 'pointer' }} onClick={() => handlePostClick(post._id)}>
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content.substring(0, 100)}...</p>
                <p className="card-text">Posted by: {post.username}</p>
              </div>
            </div>
          ))
        ) : (

          <div class="loader-container">
            <div class="loader"></div>
          </div>

        )}
      </div>

      {/* load More button */}
      {
        LoadMore ?
          <div class="loader-container">
            <div class="loader"></div>
          </div>
          :
          hasMorePosts && <button
            onClick={handleLoadMore}
            className="btn btn-primary"
          >
            Load More
          </button>

      }
    </div>
  );
};

export default Home;