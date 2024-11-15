import { useState } from 'react';
import axios from 'axios';

function AuthForm({ mode = 'login', onAuthSuccess }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    //on Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const url = mode === 'signup' ? 'http://localhost:3000/signup' : 'http://localhost:3000/login';
        
            const response = await axios.post(url, { username, email, password });

            const json = response.data;;
           if(json.success){
            localStorage.setItem('token', json.authtoken); 

            // for rendering logout or profile
            localStorage.setItem('isLoggedIn', 'true');
        
            setSuccess(json.message);
            
            // using this mthod so that the home page is reloaded after successful login or signup
            window.location.href = '/';
           }
           else{
            alert("Invalid credentials");
        }    
       
    };

    return (
        <div className="row mt-3">
            <h1 className="col-6 offset-3">
                {/* switches on basis of mode */}
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
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Success Message */}
                    {success && <p className="text-success">{success}</p>}

                    {/* Error Message */}
                    {error && <p className="text-danger">{error}</p>}

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
