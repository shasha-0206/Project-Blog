import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {

        // rendering the post using id
        const response = await axios.get(`http://localhost:3000/posts/${postId}`
        );
        setPost(response.data.post);
      } catch (err) {
        console.error('Error fetching post details:', err);
        setError('Failed to load post details');
      }
    };
    fetchPost();
  }, [postId]);

  const OnEdit = () => {
    navigate(`/posts/edit/${postId}`);
  };

  const OnDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}` 
      );
      alert("Post deleted successfully");
      navigate('/');
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post');
    }
  };

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      {post ? (
        <div className="p-3">
          <div className="d-flex">
            <img
              src={`data:image/jpeg;base64,${post.image}`}
              alt="Post"
              style={{
                width: '600px',  // Slightly larger width
                height: 'auto',
                borderRadius: '8px',
                marginRight: '20px'
              }}
            />
            <div className="flex-grow-1">
              <h3>{post.title}</h3>
              <p><strong>Author:</strong> {post.user.username ? post.user.username : 'Unknown'}</p>
              <p><strong>Posted on:</strong> {new Date(post.createdAt).toLocaleString()}</p>
              <div className="d-flex mt-2">
                <button
                  onClick={OnEdit}
                  className="btn btn-success mr-2"
                  style={{ padding: '8px 16px' }}
                >
                  Edit
                </button>
                <button
                  onClick={OnDelete}
                  className="btn btn-danger"
                  style={{ padding: '8px 16px',marginLeft:'10px' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <p className="mt-4" style={{ color: '#333', fontSize: '16px', lineHeight: '1.6' }}>
            {post.content}
          </p>
        </div>
      ) : (
        <div class="loader-container">
            <div class="loader"></div>
          </div>
      )}
    </div>
  );
};

export default PostDetails;
