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
     <div className={"row mt-5 mb-3" `${mode === 'signup' ? 'signup-mode' : 'login-mode'}`}>
            <Toaster />
            <h1 className="col-6 offset-3">{mode === 'signup' ? 'Signup on BlogBliss' : 'Login'}</h1>

            <div className="col-8 offset-3 mt-3 mb-4">
                <form onSubmit={handleSubmit} className="needs-validation mb-4" noValidate>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {mode === 'signup' && <div className="valid-feedback">Looks good!</div>}
                    </div>

                    {mode === 'signup' && (
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success add-btn mb-5">
                        {mode === 'signup' ? 'Signup' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
  );
};

export default Editor;
