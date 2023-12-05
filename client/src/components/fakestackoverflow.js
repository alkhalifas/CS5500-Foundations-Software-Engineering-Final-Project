import React, { useState,useEffect } from 'react';
import Header from "./header/header";
import Menubar from "./menubar/menubar";
import "./fakestackoverflow.css";
import QuestionsList from "./main/questionList/questionsList";
import TagsList from "./main/tagsList/tagsList";
import TagQuestionsList from "./main/TagQuestionsList/TagQuestionsList";
import SearchResultsList from './main/searchResults/searchResultsList';
import Welcome from "../components/welcome/welcome";
import Profile from "./profile/profile"
import axios from 'axios';

export default function FakeStackOverflow() {
    const [selectedComponent, setSelectedComponent] = useState('questions');
    const [selectedTag, setSelectedTag] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const [componentKey, setComponentKey] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isGuest, setIsGuest] = useState(false);
    const [userData, setUserData] = useState(null);


    const checkSessionStatus = () => {
        axios.get('http://localhost:8000/session-status', { withCredentials: true })
            .then(response => {
                if (response.data.isLoggedIn) {
                    setIsLoggedIn(true);
                    setUserData(response.data.user);
                    console.log("USER LOGGED IN")
                } else {
                    setIsLoggedIn(false);
                    setUserData(null);

                    console.log("NOT LOGGED IN")
                }
            })
            .catch(error => {
                console.error('Error checking session status:', error);
                // Handle error appropriately
            });
    };

    const handleSignIn = () => {
        setIsGuest(false);
        setIsLoggedIn(false);
    };

    useEffect(() => {

        checkSessionStatus();


    }, []);

    const handleComponentSelect = (component, tagId = null) => {
        if (selectedComponent !== component) {
            setSelectedComponent(component);
            setSelectedTag(tagId);
        }
        setSearchActive(false);
        setComponentKey(prevKey => prevKey + 1);
    };

    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case 'questions':
                return <QuestionsList key={componentKey} />;
            case 'tags':
                return <TagsList key={componentKey} onSelect={tagId => handleComponentSelect('tagQuestions', tagId)} isGuest={isGuest} />;
            case 'tagQuestions':
                return selectedTag && <TagQuestionsList key={componentKey} tagId={selectedTag} />;
            case 'profile':
                return <Profile />;
            default:
                return null;
        }
    };

    const renderContent = () => {
        if (isLoggedIn || isGuest) {
            return (
                <>
                    <Menubar onSelect={handleComponentSelect} isGuest={isGuest} />
                    <div className="main-content">
                        {searchActive ? <SearchResultsList key={componentKey} searchInput={searchInput} />
                            : renderSelectedComponent()}
                    </div>
                </>
            );
        } else {
            return <Welcome setIsLoggedIn={setIsLoggedIn} setIsGuest={setIsGuest} />;
        }
    };

    return (
        <div className="app-container">
            <Header
                key={userData}
                setSearchInput={setSearchInput}
                setSearchActive={setSearchActive}
                // userData={userData}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                isGuest={isGuest}
                handleSignIn={handleSignIn}
            />
            <div className="content-container">
                {renderContent()}
            </div>
        </div>
    );
}
