import React, { useState } from "react";
import axios from "axios";

const PasswordChangeForm = () => {

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      setMessage(response.data.message);
      setError("");  // Reset error message
    } catch (err) {
      setError(err.response.data.error || "Failed to change password");
      setMessage("");  // Reset success message
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        {error && <div style={styles.errorMessage}>{error}</div>}
        {message && <div style={styles.successMessage}>{message}</div>}
        
        

        <div style={styles.inputGroup}>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        

        <button type="submit" style={styles.updateButton}>Change Password</button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "400px",
    margin: "0 auto",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  errorMessage: {
    color: "red",
    marginBottom: "10px",
  },
  successMessage: {
    color: "green",
    marginBottom: "10px",
  },
  updateButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
  },
};

export default PasswordChangeForm;