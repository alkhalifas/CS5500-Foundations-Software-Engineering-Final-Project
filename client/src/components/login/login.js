import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import PropTypes from 'prop-types';

export default function Login({setIsLoggedIn, registerSuccess}) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', credentials, { withCredentials: true });
            console.log("response.data:", response.data);
            setIsLoggedIn(true)
        } catch (error) {
            setFeedbackMessage(error.response?.data?.message || 'Unknown Error. Contact Admin.');
            console.error('Login error:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input id={"username"} type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} required />
                <input id={"password"} type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
                <p style={{"color":"red"}}>{feedbackMessage}</p>
                {
                    registerSuccess &&
                    <p style={{"color":"royalblue"}}>Successfully created account!</p>
                }
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

Login.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    registerSuccess: PropTypes.bool
};