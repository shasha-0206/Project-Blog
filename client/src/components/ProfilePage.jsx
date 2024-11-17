import React, { useState, useRef } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaUserEdit, FaKey } from "react-icons/fa";

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: ""
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div style={styles.pageContainer}>
        <span></span>
      <div style={styles.sidebar}>
      <div style={styles.sidebarItem}>
          <span><h2>Settings</h2></span>
        </div>
        <div style={styles.sidebarItem}>
          <FaUserEdit style={styles.icon} />
          <span>Edit Profile</span>
        </div>
        <div style={styles.sidebarItem}>
          <FaKey style={styles.icon} />
          <span>Change Password</span>
        </div>
      </div>
      <div style={styles.container}>
        <div style={styles.profileContainer}>
          <h2 style={styles.header}>Profile</h2>
          <div style={styles.profileImageSection}>
            <label htmlFor="uploadImage" style={styles.imageLabel}>
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  style={styles.profileImage}
                />
              ) : (
                <div style={styles.uploadPlaceholder}>Upload Image</div>
              )}
            </label>
            <input
              type="file"
              id="uploadImage"
              style={styles.fileInput}
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
          </div>
          <button onClick={handleUploadClick} style={styles.uploadButton}>
            Upload
          </button>

          <div style={styles.formSection}>
            <div style={styles.inputGroup}>
              <label>Username</label>
              <input type="text" value={username} readOnly style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label>Email</label>
              <input type="email" value={email} readOnly style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label>Bio</label>
              <textarea
                maxLength="200"
                placeholder="Add a short bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={styles.textarea}
              />
              <p style={styles.charCounter}>{200 - bio.length} characters left</p>
            </div>
            <h3 style={styles.subHeader}>Add Your Social Handles Below</h3>
            <div style={styles.socialInputs}>
              {[
                { name: "facebook", icon: <FaFacebook />, placeholder: "Facebook URL" },
                { name: "instagram", icon: <FaInstagram />, placeholder: "Instagram URL" },
                { name: "twitter", icon: <FaTwitter />, placeholder: "Twitter URL" },
                { name: "linkedin", icon: <FaLinkedin />, placeholder: "LinkedIn URL" },
              ].map(({ name, icon, placeholder }) => (
                <div key={name} style={styles.socialInputGroup}>
                  <div style={styles.iconWrapper}>{icon}</div>
                  <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={socialLinks[name]}
                    onChange={handleInputChange}
                    style={styles.socialInput}
                  />
                </div>
              ))}
            </div>
          </div>

          <button style={styles.updateButton}>Update</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa"
  },
  sidebar: {
    width: "300px",
    backgroundColor: "#343a40",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    padding: "20px"
  },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    cursor: "pointer"
  },
  icon: {
    marginRight: "10px",
    fontSize: "20px"
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px"
  },
  profileContainer: {
    width: "800px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
  },
  header: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333"
  },
  profileImageSection: {
    textAlign: "center",
    marginBottom: "10px"
  },
  imageLabel: {
    display: "inline-block",
    cursor: "pointer"
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover"
  },
  uploadPlaceholder: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    backgroundColor: "#e0e0e0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#777",
    fontSize: "16px"
  },
  fileInput: {
    display: "none"
  },
  uploadButton: {
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "block",
    margin: "0 auto"
  },
  formSection: {
    marginBottom: "20px"
  },
  inputGroup: {
    marginBottom: "15px"
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginTop: "5px"
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginTop: "5px"
  },
  charCounter: {
    fontSize: "12px",
    color: "#555",
    textAlign: "right"
  },
  subHeader: {
    marginTop: "20px",
    marginBottom: "10px",
    color: "#333"
  },
  socialInputs: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "15px"
  },
  socialInputGroup: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px",
    backgroundColor: "#f1f1f1"
  },
  iconWrapper: {
    marginRight: "10px",
    fontSize: "20px",
    color: "#007bff"
  },
  socialInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "8px",
    backgroundColor: "transparent"
  },
  updateButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "16px"
  }
};

export default ProfilePage;
