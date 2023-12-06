import React, { useState, useEffect } from 'react';
import QuestionsList from "./questionsList";
import TagsList from "./tagsList/tagsList";
//import AnswersList from "../main/Answers/AnswersPage";
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
    const [selectedComponent, setSelectedComponent] = useState('tags');
    const [componentKey, setComponentKey] = useState(0);
    const [selectedProfileComponent, setSelectedProfileComponent] = useState('questions');

    const handleSelectedProfileComponent = (status) => {
        setSelectedProfileComponent(status);
        console.log("setSelectedProfileComponent: ", status);
    }


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

    const handleComponentSelect = (component) => {
        if (selectedComponent !== component) {
            setSelectedComponent(component);
        }
        setComponentKey(prevKey => prevKey + 1);
    };

    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case 'questions':
                return <QuestionsList key={componentKey} />;
            case 'tags':
                return <TagsList key={componentKey} />;
//            case 'answers':
//                return <AnswersList key={componentKey} />;
            default:
                return null;
        }
    };

    const renderContent = () => {
        return (
            <>
                <profileMenu onSelect={handleComponentSelect}/>
                <div className="main-content">
                    {renderSelectedComponent()}
                </div>
            </>
        );
    };

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
            </div>
            <div className="content-container">
                {renderContent()}
            </div>
        </div>
    );
}