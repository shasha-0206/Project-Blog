import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';


const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // checking where the page was loaded from or checking if state was passed to it
  const isFromMyPosts = location.state?.fromMyPosts;

  useEffect(() => {
    const fetchPost = async () => {
      try {

        // rendering the post using id
        const response = await axios.get(`http://localhost:3000/posts/${postId}`);
        setPost(response.data.post);
        setComments(response.data.post.comments || []);
      } catch (err) {
        toast.error('Failed to load post details');
      }
    };
    fetchPost();
  }, [postId]);

  const OnEdit = () => {
    navigate(`/posts/edit/${postId}`);
  };

  const OnDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      toast.success("Post deleted successfully");

      setTimeout(() => {
        navigate('/MyPosts');

      }, 2000);
    } catch (err) {
      console.error('Error deleting post:', err);
      toast.error('Failed to delete post');
    }
  };

  // comments
  const handleAddComment = async (commentText) => {

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('You must be logged in to add a comment');
        return;
      }

      const response = await axios.post(`http://localhost:3000/posts/comments/${postId}`,
        { text: commentText },
        { headers: { 'auth-token': token } }
      );;

      // loads the prev comments again when the button is clicked due to which new comments appear immediately
      setComments((prevComments) => [
        ...prevComments,
        { username: response.data.comments.at(-1).username, text: commentText }
      ]);

      setNewComment(''); // Clear the input field
      toast.success('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error.response?.data?.message || error.message);
      toast.error('Failed to add comment');
    }
  };

  return (
    <div className="container mt-4">
      <Toaster />
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

              {
                isFromMyPosts ?
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
                      style={{ padding: '8px 16px', marginLeft: '10px' }}
                    >
                      Delete
                    </button>
                  </div> : ""

              }

            </div>

          </div>
          <p className="mt-4" style={{ color: '#333', fontSize: '16px', lineHeight: '1.6' }}>
            {post.content}
          </p>

          <p className="mt-4"><strong>Likes:</strong> 0</p>
          <button
            // onClick={handleLike}
            // disabled={liked}
            className="btn btn-primary"
            style={{ marginTop: '10px' }}
          >
            {/* {liked ? 'Liked' : 'Like'} */}
            like
          </button>

          {/* comments section */}
          <h4 className="mt-4">Comments</h4>

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            className="form-control mt-3"
            rows="3"
          ></textarea>

          <button

            onClick={() => handleAddComment(newComment)}
            className="btn btn-secondary mt-2">Add Comment
          </button>


          <ul className="mt-3">

            {comments.map((comment, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <strong>{comment.username}:</strong> {comment.text}
              </li>
            ))}

          </ul>

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
