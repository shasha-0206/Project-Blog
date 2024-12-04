import React, { useState, useEffect } from 'react'; // Ensure useEffect is imported here
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

function AuthForm({ mode = 'login' }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // UseEffect example: Handling a redirect message
    useEffect(() => {
        const redirectMessage = localStorage.getItem('redirectMessage');
        if (redirectMessage) {
           
            toast.error(redirectMessage);
            localStorage.removeItem('redirectMessage');
        }
        const addpostsredirectmessage = localStorage.getItem('addpostsrm');
        if(addpostsredirectmessage){
            toast.error(addpostsredirectmessage);
            localStorage.removeItem('addpostsrm')
        }
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = mode === 'signup' ? 'http://localhost:3000/signup' : 'http://localhost:3000/login';

        try {
            const response = await axios.post(url, { username, email, password });
            const json = response.data;

            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                localStorage.setItem('isLoggedIn', 'true');

                toast.success(mode === 'signup' ? 'Signup successful!' : 'Login successful!');

                setTimeout(() => {
                    window.location.href = '/';
                }, 500);
            }

        } catch (err) {
            if (err.response && err.response.data) {
                toast.error(err.response.data.message || 'An error occurred.');
            } else {
                toast.error('Network error. Please try again later.');
            }
        }
    };

    return (
        <div className={`row mt-5 mb-3 ${mode === 'signup' ? 'signup-mode' : 'login-mode'}`}>
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
}

export default AuthForm;
