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

export default function FakeStackOverflow() {
    const [userSession, setUserSession] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState('questions');
    const [selectedTag, setSelectedTag] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const [componentKey, setComponentKey] = useState(0);

    useEffect(() => {

        const checkUserSession = () => {
            const token = localStorage.getItem('token');
            setUserSession(token);
        };

        checkUserSession();


        window.addEventListener('storage', checkUserSession);

        return () => {
            window.removeEventListener('storage', checkUserSession);
        };

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
                return <TagsList key={componentKey} onSelect={tagId => handleComponentSelect('tagQuestions', tagId)} />;
            case 'tagQuestions':
                return selectedTag && <TagQuestionsList key={componentKey} tagId={selectedTag} />;
            case 'profile':
                return <Profile userSession={userSession}/>;
            default:
                return null;
        }
    };

    const renderContent = () => {
        if (userSession) {
            return (
                <>
                    <Menubar onSelect={handleComponentSelect} />
                    <div className="main-content">
                        {searchActive ? <SearchResultsList key={componentKey} searchInput={searchInput} />
                            : renderSelectedComponent()}
                    </div>
                </>
            );
        } else {
            return <Welcome setUserSession={setUserSession} />;
        }
    };

    return (
        <div className="app-container">
            <Header setSearchInput={setSearchInput} setSearchActive={setSearchActive} setUserSession={setUserSession} userSession={userSession}/>
            <div className="content-container">
                {renderContent()}
            </div>
        </div>
    );
}
