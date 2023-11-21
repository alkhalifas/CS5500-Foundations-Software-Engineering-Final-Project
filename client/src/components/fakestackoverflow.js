import React, { useState } from 'react';
import Header from "./header/header";
import Menubar from "./menubar/menubar";
import "./fakestackoverflow.css"
import QuestionsList from "./main/questionList/questionsList";
import TagsList from "./main/tagsList/tagsList";
import TagQuestionsList from "./main/TagQuestionsList/TagQuestionsList";
import SearchResultsList from './main/searchResults/searchResultsList';
import Welcome from "../components/welcome/welcome"

export default function FakeStackOverflow() {
    const [userStatus, setUserStatus] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState('questions');
    const [selectedTag, setSelectedTag] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const [componentKey, setComponentKey] = useState(0);

    const handleComponentSelect = (component, tagId = null) => {
        if (selectedComponent !== component) {
            setSelectedComponent(component);
            setSelectedTag(tagId);
        }
        setSearchActive(false);
        // Increment the componentKey to trigger a re-render
        setComponentKey(prevKey => prevKey + 1);
    };


    const renderComponent = () => {
        return searchActive
            ? <SearchResultsList key={componentKey} searchInput={searchInput} />
            : (
                selectedComponent === 'questions' ? <QuestionsList key={componentKey} />
                    : selectedComponent === 'tags' ? <TagsList key={componentKey} onSelect={tagId => handleComponentSelect('tagQuestions', tagId)} />
                        : selectedComponent === 'tagQuestions' && selectedTag ? <TagQuestionsList key={componentKey} tagId={selectedTag} />
                            : null
            );
    };

    return (
        <div className="app-container">
            <Header setSearchInput={setSearchInput} setSearchActive={setSearchActive}/>
            <div className="content-container">
                {
                    userStatus ? (
                        <>
                            <Menubar onSelect={handleComponentSelect} />
                            <div className="main-content">{renderComponent()}</div>
                        </>
                    ) : (
                        <Welcome setUserStatus={setUserStatus} />
                    )
                }
            </div>
        </div>
    );

}
