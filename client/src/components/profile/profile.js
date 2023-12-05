import React, { useState, useEffect } from 'react';
import "./profile.css"

const calculateDaysSinceCreation = (createdOn) => {
    if (!createdOn) return 0;
    const createdDate = new Date(createdOn);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - createdDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
};


export default function Profile() {
    const [userData, setUserData] = useState({ username: '', email: '', reputation: 0, createdOn: ''});

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/user`, {
                method: 'GET',
                credentials: 'include', // include session cookies
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setUserData(data);
            console.log("userData: ", userData)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="profile-container">
            <h1>Welcome, {userData.username}</h1>
            <div className="cards-container">
                <div className="card">
                    <div className="card-value">
                        {calculateDaysSinceCreation(userData.createdOn)}
                    </div>
                    <div className="card-description">
                        Days on FSO
                    </div>
                </div>
                <div className="card">
                    <div className="card-value">
                        {userData.reputation}
                    </div>
                    <div className="card-description">
                        Reputation Points
                    </div>
                </div>
                <div className="card">
                    <div className="card-value">
                        0
                    </div>
                    <div className="card-description">
                        Questions Asked
                    </div>
                </div>
                <div className="card">
                    <div className="card-value">
                        0
                    </div>
                    <div className="card-description">
                        Questions Answered
                    </div>
                </div>
            </div>



            {/*<form>*/}
            {/*    <div className="form-group">*/}
            {/*        <label htmlFor="username">Username:</label>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            id="username"*/}
            {/*            value={userData.username}*/}
            {/*            disabled*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="form-group">*/}
            {/*        <label htmlFor="email">Email:</label>*/}
            {/*        <input*/}
            {/*            type="email"*/}
            {/*            id="email"*/}
            {/*            value={userData.email}*/}
            {/*            disabled*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="form-group">*/}
            {/*        <label htmlFor="reputation">Reputation:</label>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            id="reputation"*/}
            {/*            value={userData.reputation}*/}
            {/*            disabled*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="form-group">*/}
            {/*        <label htmlFor="createdOn">Days Since Account Creation:</label>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            id="createdOn"*/}
            {/*            value={calculateDaysSinceCreation(userData.createdOn)}*/}
            {/*            disabled*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</form>*/}
        </div>
    );

}
