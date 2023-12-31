import React, { useState } from 'react';
import axios from 'axios';
import './register.css';
import PropTypes from 'prop-types';

export default function Register({ setRegisterSuccess, setUserSelection}) {
    const [formRegisterData, setFormRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [feedbackMessage, setFeedbackMessage] = useState('');


    const handleChange = (e) => {
        setFormRegisterData({ ...formRegisterData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formRegisterData.password !== formRegisterData.confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/register', formRegisterData);
            console.log(response.data);
            setRegisterSuccess(true)
            setUserSelection("log-in")
        } catch (error) {
            setFeedbackMessage(error.response?.data?.message || 'Registration failed');
            console.error('Registration error:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <input id={"usernameInput"} type="text" name="username" placeholder="Username" value={formRegisterData.username} onChange={handleChange} required />
                <input id={"emailInput"} type="email" name="email" placeholder="Email" value={formRegisterData.email} onChange={handleChange} required />
                <input id={"passwordInput"} type="password" name="password" placeholder="Password (min 6 digits)" value={formRegisterData.password} onChange={handleChange} required />
                <input
                    id={"confirmPasswordInput"}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password (min 6 digits)"
                    value={formRegisterData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <p style={{"color":"red"}}>{feedbackMessage}</p>
                {
                    (formRegisterData.password !== formRegisterData.confirmPassword || formRegisterData.password.length <= 5) &&
                    <button style={{"backgroundColor":"gray", "cursor":"not-allowed"}} type="submit" disabled={true}>Register </button>
                }
                {
                    (formRegisterData.password === formRegisterData.confirmPassword && formRegisterData.password.length > 5) &&
                    <button id={"registerSubmit"} type="submit">Register </button>
                }
            </form>
        </div>
    );
}

Register.propTypes = {
    setRegisterSuccess: PropTypes.func.isRequired,
    setUserSelection: PropTypes.func.isRequired,
};