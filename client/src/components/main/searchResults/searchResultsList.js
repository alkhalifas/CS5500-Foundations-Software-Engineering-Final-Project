import React, { useEffect, useState, useCallback } from 'react';
import QuestionCardTiming from "../questionList/QuestionCardTiming";
import formatQuestionText from "../utils"
import QuestionForm from "../questionForm/questionForm";
import AnswersPage from "../Answers/AnswersPage";
import axios from "axios";
import PropTypes from 'prop-types';

export default function SearchResultsList({ searchInput }) {
    const [showForm, setShowForm] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [totalResults, setTotalResults] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const handleAskQuestion = () => {
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        const apiUrl = `http://localhost:8000/questions`;
        try {
            const response = await axios.post(apiUrl, formData);
            console.log('Question added successfully:', response.data);
            setShowForm(false);
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
    };

    const fetchQuestions = async (sortType, page) => {
        const apiUrl = `http://localhost:8000/questions?sort=${sortType}&searchInput=${searchInput}&page=${page}`;
        try {
            const response = await axios.get(apiUrl);
            setSearchResults(response.data.questions);
            setCurrentPage(response.data.currentPage);
            setTotalResults(response.data.totalQuestions);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSort = useCallback((sortType) => {
        fetchQuestions(sortType, 1);
    }, [searchInput]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            fetchQuestions('newest', parseInt(currentPage) + 1);
        } else if (currentPage == totalPages) {
            fetchQuestions('newest', 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            fetchQuestions('newest', parseInt(currentPage) - 1);
        }
    };

    useEffect(() => {
        fetchQuestions('newest', 1);
    }, [searchInput]);

    return (
        <div>
            {showForm ? (
                <QuestionForm onSubmit={handleFormSubmit} />
            ) : selectedQuestion ? (
                <div id={"answersHeader"}>
                    <div className="header-container">
                        <h1>Search Results</h1>
                        <button className={"ask-question-button"} onClick={handleAskQuestion}>Ask a Question</button>
                    </div>
                    <AnswersPage question={selectedQuestion} />
                </div>
            ) : (
                <>
                    <div className="header-container">
                        <h1>Search Results</h1>
                        <button className={"ask-question-button"} onClick={handleAskQuestion}>Ask a Question</button>
                    </div>
                    <div className="header-container">
                        <h3>{totalResults} results</h3>
                        <div className="sorting-buttons">
                            <button className={"sort-button"} onClick={() => handleSort('newest')}>Newest</button>
                            <button className={"sort-button"} onClick={() => handleSort('active')}>Active</button>
                            <button className={"sort-button"} onClick={() => handleSort('unanswered')}>Unanswered</button>
                        </div>
                    </div>
                    {searchResults.length === 0 ? (
                        <div className="no-questions-found-message">
                            <h3>No Results Found</h3>
                        </div>
                    ) : (
                        <>
                            <div className="question-cards scrollable-container">
                                {searchResults.map((question, index) => (
                                    <div key={question.qid}>
                                        <div key={question.qid} className="question-card">
                                            <div className={"question-left postStats"}>
                                                <p>{question.views} views</p>
                                                <p>{question.answers.length} answers</p>
                                            </div>
                                            <div className={"question-mid"}>
                                                <h4 className={"postTitle"} onClick={() => handleQuestionClick(question)}>{question.title}</h4>
                                                <p style={{"fontSize":"12px"}} dangerouslySetInnerHTML={formatQuestionText(question.text)} />
                                                <div className="tags">
                                                    {question.tags.map(tag => (
                                                        <span key={tag} className="badge">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className={"question-right lastActivity"}>
                                                <QuestionCardTiming question={question} />
                                            </div>
                                        </div>
                                        {index !== searchResults.length - 1 && <div className="dotted-line" />}
                                    </div>
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className="pagination-buttons">
                                    {
                                        (parseInt(currentPage) === 1) &&
                                        <button style={{"backgroundColor":"#f1f1f1", "cursor":"not-allowed"}} className="prev" disabled={true}>Prev</button>
                                    }
                                    {
                                        (parseInt(currentPage) != 1) &&
                                        <button onClick={handlePrevPage} className="prev">Prev</button>
                                    }
                                    <button onClick={handleNextPage} className="next">Next</button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}

SearchResultsList.propTypes = {
    searchInput: PropTypes.string.isRequired
};