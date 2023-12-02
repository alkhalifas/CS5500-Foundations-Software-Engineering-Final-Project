import React, {useEffect, useState} from 'react';
import QuestionForm from "../questionForm/questionForm";
import "./questionList.css"
import AnswersPage from "../Answers/AnswersPage";
import QuestionCardTiming from "./QuestionCardTiming";
import formatQuestionText from "../utils"
import axios from "axios";

export default function QuestionsList() {
    const [showForm, setShowForm] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [sortedQuestions, setSortedQuestions] = useState([]);
    const [totalResults, setTotalResults] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isGuest, setIsGuest] = useState(true);
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
            setIsGuest(false)
            console.log("userData: ", userData)
        } catch (error) {
            setIsGuest(true)
            console.error('Error fetching user data:', error);
        }
    };

    const handleAskQuestion = () => {
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        const apiUrl = `http://localhost:8000/questions`;
        try {
            const response = await axios.post(apiUrl, formData);
            console.log('Question added successfully:', response.data);

            await handleSort('newest');
            setShowForm(false);
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
    };

    const fetchQuestions = async (sortType, page) => {
        const apiUrl = `http://localhost:8000/questions?sort=${sortType}&page=${page}`;
        try {
            const response = await axios.get(apiUrl);
            setSortedQuestions(response.data.questions);
            setCurrentPage(response.data.currentPage);
            setTotalResults(response.data.totalQuestions);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleSort = async (sortType) => {
        fetchQuestions(sortType, 1);
    };

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
        fetchUserData();
    }, []);

    return (
        <div>
            {showForm ? (
                <QuestionForm onSubmit={handleFormSubmit} />
            ) : selectedQuestion ? (
                <div id={"answersHeader"}>
                    <div className="header-container">
                        <h1>All Answers</h1>
                        {
                            !isGuest &&
                            <button className={"ask-question-button"} onClick={handleAskQuestion}>Ask a Question</button>
                        }
                        {/*<button className={"ask-question-button"} onClick={handleAskQuestion}>Ask a Question</button>*/}
                    </div>
                    <AnswersPage question={selectedQuestion} />

                </div>
            ) : (
                <>
                    <div className="header-container">
                        <h1>All Questions</h1>
                        {!isGuest && (
                            <button className={"ask-question-button"} onClick={handleAskQuestion}>Ask a Question</button>
                        )}
                    </div>

                    <div className="header-container">
                        <h3>{totalResults} questions</h3>
                        <div className="sorting-buttons">
                            <button className={"sort-button"} onClick={() => handleSort('newest')}>Newest</button>
                            <button className={"sort-button"} onClick={() => handleSort('active')}>Active</button>
                            <button className={"sort-button"} onClick={() => handleSort('unanswered')}>Unanswered</button>
                        </div>
                    </div>

                    <div className="question-cards scrollable-container">
                        {sortedQuestions.map((question, index) => (
                            <div key={question.qid}>
                                <div
                                    key={question.qid}
                                    className="question-card"
                                >
                                    <div className={"question-left postStats"}>
                                        <p>{question.views} views</p>
                                        <p>{question.votes} votes</p>
                                        <p>{question.answers.length} answers</p>
                                    </div>
                                    <div className={"question-mid"}>
                                        <h4 className={"postTitle"}
                                            onClick={() => handleQuestionClick(question)}
                                        >{question.title}
                                        </h4>
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
                                {index !== sortedQuestions.length - 1 && <div className="dotted-line" />}
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
        </div>
    );
}