import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from "react-hot-toast";

const Editor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('https://blog-bliss2.onrender.com/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth-token': localStorage.getItem('token'),
        },
      });

      toast.success(response.data.message);

      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (err) {
      console.error('Error creating post:', err.response || err);
      toast.error('Error creating post');
    }
  };

  useEffect(() => {
    let isLoggedIn = localStorage.getItem('isLoggedIn') === "true";
    if (!isLoggedIn) {
      localStorage.setItem('addpostsrm', 'You must be logged in to post.');
      navigate('/signin');
    }
  }, []); 

  return (
      <div className="container mt-3 mb-3">
      <Toaster />
      <h3 className="col-12 col-md-8 offset-md-2">Upload a New Post</h3>

      <form onSubmit={handleSubmit} noValidate className="needs-validation" encType="multipart/form-data">
        <button
          className="btn btn-info submit-btn form-control mb-2"
          onClick={() => navigate('/generate-ai')}
        >
          Generate with AI
        </button>

        <div className="row mb-3">
          <div className="col-12 col-md-8 offset-md-2">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              name="post[title]"
              placeholder="Add a catchy title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 col-md-8 offset-md-2">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea
              name="post[content]"
              className="form-control"
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
            <div className="invalid-feedback">Please input some content to post</div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 col-md-8 offset-md-2">
            <label htmlFor="image" className="form-label">Upload Image</label>
            <input
              type="file"
              name="post[image]"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <button className="btn btn-dark add-btn mb-2" type="submit">Add</button>
          </div>
        </div>
      </form>

    </div>
  );
};

export default Editor;
