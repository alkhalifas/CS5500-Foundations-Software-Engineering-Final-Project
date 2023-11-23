import React, { useState } from 'react';
import axios from 'axios';
import './register.css';
import PropTypes from 'prop-types';

export default function Register({setUserSession}) {
    const [formRegisterData, setFormRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormRegisterData({ ...formRegisterData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/register', formRegisterData);
            console.log(response.data);
            localStorage.setItem('token', response.data.token)

            const token = localStorage.getItem('token');
            console.log("localStorage.getItem('token'): ", token)

            setUserSession(token)
        } catch (error) {
            console.error('Registration error:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <input type="text" name="username" placeholder="Username" value={formRegisterData.username} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formRegisterData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formRegisterData.password} onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

Register.propTypes = {
    setUserSession: PropTypes.func.isRequired
};