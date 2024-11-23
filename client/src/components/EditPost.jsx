import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast , Toaster } from 'react-hot-toast';

const EditPost = () => {
  const { postId } = useParams(); // Get postId from URL
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    content: '',
    image: '', // Initial values for state
  });
  const [selectedFile, setSelectedFile] = useState(null); // For new file upload
  const [imagePreview, setImagePreview] = useState(null); // For preview of new image
  const [OriginalImageUrl, setOriginalImageUrl] = useState()

  // Fetch the post data when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${postId}`);
        const postData = response.data.post;
        const originalImageUrl = response.data.originalImageUrl;

        setPost(postData);
        setOriginalImageUrl(originalImageUrl); // Set the originalImageUrl
      } catch (err) {
        console.error('Error fetching post details:', err);
        toast.error('Failed to load post details');
      }
    };

    fetchPost();
  }, [postId]);


  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Generate a preview for the new image
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      await axios.put(`http://localhost:3000/posts/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Post Updated successfully")
      setTimeout(() => {
        navigate('/MyPosts'); // Redirect to the home page or posts list
      }, 2000)

    } catch (err) {
      console.error('Error updating post:', err);
      toast.error('Failed to update post. Please try again.');
    }
  };

  return (
    <div className="container mt-3">
      <Toaster />
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

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload New Image</label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            onChange={handleImageChange}
          />
          {
            imagePreview ? (
              <div className="mt-2">
                <strong>New Image Preview:</strong>
                <br />
                <img
                  src={imagePreview}
                  alt="New_Image_Preview"
                  style={{
                    width: '13rem',
                    height: '13rem',
                    objectFit: 'cover',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                  }}
                />
              </div>
            ) :

              <div>
                <strong>Original Post Image</strong>
                <br />
                <img
                  src={OriginalImageUrl}
                  alt="Original_Image"
                  style={{ width: '13rem', height: '13rem' }}
                />
              </div>
          }
        </div>

        <button type="submit" className="btn btn-dark edit-btn mt-3">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPost;