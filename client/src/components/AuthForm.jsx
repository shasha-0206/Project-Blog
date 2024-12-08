import { useState } from 'react';
import axios from 'axios';
// API to display toast notifications in your React app
import { Toaster, toast } from "react-hot-toast";

function AuthForm({ mode = 'login' }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // onSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = mode === 'signup' ? 'http://localhost:3000/signup' : 'http://localhost:3000/login';

        try {

            // sending data to backend 
            const response = await axios.post(url, { username, email, password });
            const json = response.data;
            
            // success variable we sent from backend is being used here for authentication without any errors
            if (json.success) {

                // saving token and loggedin inside localstorage
                localStorage.setItem('token', json.authtoken);
                localStorage.setItem('isLoggedIn', 'true');

                // Show success toast
                toast.success(mode === 'signup' ? 'Signup successful!' : 'Login successful!');

                // Redirect after .5 seconds
                setTimeout(() => {
                    window.location.href = '/';
                }, 500);
            }
            
        } catch (err) {
            if (err.response && err.response.data) {
                // Extract error message and show error toast
                toast.error(err.response.data.message || 'An error occurred.');
            } else {
                toast.error('Network error. Please try again later.');
            }
        }
    };

    return (
        <div className="row mt-3">
            {/* used to render success and errors mssgs in frontend */}
            <Toaster />
            <h1 className="col-6 offset-3">
                {mode === 'signup' ? 'Signup on BlogBliss' : 'Login'}
            </h1>

            <div className="col-8 offset-3 mt-3">
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>

                    {/* Username Field */}
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

                    {/* Email Field (only for signup) */}
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

                    {/* Password Field */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <input

                            // for pass visibility
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            {/* eye icon */}
                            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-success add-btn">
                        {mode === 'signup' ? 'Signup' : 'Login'}
                    </button>
                </form>
            </div>

        </div>
    );
}

export default AuthForm;
