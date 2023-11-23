import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import PropTypes from 'prop-types';

export default function Login({setUserSession}) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', credentials);
            console.log(response.data);
            localStorage.setItem('token', response.data.token)

            const token = localStorage.getItem('token');
            console.log("localStorage.getItem('token'): ", token)

            setUserSession(token)
        } catch (error) {
            console.error('Login error:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

Login.propTypes = {
    setUserSession: PropTypes.func.isRequired
};