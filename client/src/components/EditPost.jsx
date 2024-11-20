import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const { postId } = useParams(); // Get postId from URL
  const [post, setPost] = useState({

    // using these since they render before page is loaded and give us error to avoid it we need to inisialize them
    title: '',
    content: '',
    image: '', // Initial values for state
  });
  const [OriginalImageUrl,setOriginalImageUrl] = useState()

  // Fetch the post data when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${postId}`);
        setPost(response.data.post);
        setOriginalImageUrl(response.data.originalImageUrl); // Assuming the response contains the original image URL
      } catch (err) {
        console.error('Error fetching post details:', err);
        setError('Failed to load post details');
      }
    };

    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    console.log('post')
  };

  const handleImageChange = (e) => {
    console.log('image')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit')
};

  return (
    <div className="container mt-3">
      <h3>Edit Post</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            name="content"
            id="content"
            value={post.content}
            onChange={handleChange}
            className="form-control"
            rows="20"
            required
          />
        </div>

        <div>
          <strong>Original Post Image</strong>
          <br />
          <img
            src={OriginalImageUrl}
            alt="Original_Image"
            style={{ width: '13rem', height: '13rem' }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload New Image</label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="btn btn-dark edit-btn mt-3">Edit</button>
      </form>
    </div>
  );
};

export default EditPost;
