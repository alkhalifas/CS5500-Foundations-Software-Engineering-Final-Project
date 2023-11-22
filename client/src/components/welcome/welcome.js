import React from 'react';

export default function Welcome({ setUserStatus }) {
    const handleUserChoice = (status) => {
        // Calling the setUserStatus function passed from the parent component
        setUserStatus(status);
    };

    return (
        <div className="app-container">
            <h1>Welcome, Please Select a Login Method</h1>
            <button onClick={() => handleUserChoice('logged_in')}>Log In</button>
            <button onClick={() => handleUserChoice('registered')}>Register</button>
            <button onClick={() => handleUserChoice('guest')}>Proceed as Guest</button>
        </div>
    );
}
