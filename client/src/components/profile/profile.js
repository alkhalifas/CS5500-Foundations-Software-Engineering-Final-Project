import React, { useState, useEffect } from 'react';
import "./profile.css"
export default function Profile() {
    const [userData, setUserData] = useState({ username: '', email: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await fetch('http://localhost:8000/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={userData.username}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={userData.email}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reputation">Reputation:</label>
                    <input
                        type="text"
                        id="reputation"
                        value={userData.reputation}
                        disabled
                    />
                </div>
            </form>
        </div>
    );

}
