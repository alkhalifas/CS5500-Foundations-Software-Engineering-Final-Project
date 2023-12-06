import React, { useEffect, useState } from 'react';
import "./answersList.css"
import AnswerForm from "../answerForm/answerForm";
import formatQuestionText from "../../main/utils";
import axios from "axios";

export default function AnswersList() {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [totalResults, setTotalResults] = useState();
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const fetchAnswers = async (page) => {
        try {
            const response = await fetch(`http://localhost:8000/user/questions?page=${page}`, {
                method: 'GET',
                credentials: 'include', // include session cookies
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            setAnswers(responseData.answers);
            setCurrentPage(responseData.currentPage);
            setTotalResults(responseData.totalAnswers);
            setTotalPages(responseData.totalPages);
        } catch (error) {
            console.error('Error fetching answers:', error);
        }
    };

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleAnswerEdit = async (formData) => {
        const apiUrl = `http://localhost:8000/questions/${selectedAnswer._id}`;
        try {
            const response = await axios.put(apiUrl, formData);
            console.log('Question edited successfully:', response.data);

            fetchQuestions(1);
            setSelectedAnswer(null);
        } catch (error) {
            console.error('Error editing the question:', error);
        }
    };

    const handleAnswerDelete = async () => {
        const apiUrl = `http://localhost:8000/questions/${selectedAnswer._id}`;
        try {
            const response = await axios.delete(apiUrl);
            console.log('Question deleted successfully:', response.data);

            fetchQuestions(1);
            setSelectedAnswer(null);
        } catch (error) {
            console.error('Error deleting the question:', error);
        }
    };

    useEffect(() => {
        updateSortedAnswers(1);
    }, []);

    const handleFormSubmit = async (formData) => {
        const apiUrl = `http://localhost:8000/questions/${question._id}/answers`;
        try {
            const response = await axios.post(apiUrl, formData);
            console.log('Answer added successfully:', response.data);

            await updateSortedAnswers(1);
            setShowAnswerForm(false);
        } catch (error) {
            console.error('Error adding answer:', error);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            updateSortedAnswers(parseInt(currentPage) + 1);
        } else if (currentPage == totalPages) {
            updateSortedAnswers(1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            updateSortedAnswers(parseInt(currentPage) - 1);
        }
    };

    function truncateQuestionText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    }

    return (
        <div>
            {selectedAnswer ? (
                <AnswerForm onSubmit={handleFormSubmit}/>
            ) : (
                <>
                    <div className="header-container">
                        <h3>{totalResults} Answers</h3>
                    </div>
                    <div className="answer-cards scrollable-container">
                        {answers.map((answer, index) => (
                            <div key={answer._id}>
                                <div
                                    key={answer._id}
                                    className="answer-card"
                                >
                                    <div className={"answer-mid"}>
                                        <p style={{"fontSize":"12px"}} onClick={() => handleAnswerClick(answer)} dangerouslySetInnerHTML={formatQuestionText(truncateQuestionText(answer.text, 50))} />
                                        <div className="tags">
                                            {question.tags.map(tag => (
                                                <span key={tag} className="badge">{tag}</span>
                                            ))}
                                        </div>
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
                                <button className="page-button" disabled={true}>Prev</button>
                            }
                            {
                                (parseInt(currentPage) != 1) &&
                                <button onClick={handlePrevPage} className="page-button">Prev</button>
                            }
                            <button onClick={handleNextPage} className="page-button">Next</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );

    return (
        <div>
            {!showAnswerForm ? (
                <>
                    <div className="header-container">
                        <h3>{totalResults} answers</h3>
                        <h3>{question.title}</h3>
                        <h3> </h3>
                    </div>
                    <div className="question-container" id={"questionBody"}>
                        <div className={"stacked-items"}>
                            <div className="views-column">
                                <span className="views-count">{views} views</span>
                            </div>
                            <div className="votes-column">
                                <span className="votes-count">{votes} votes</span>
                            </div>
                        </div>
                        <div className="question-text-column">
                            <p style={{"fontSize":"12px"}} dangerouslySetInnerHTML={formatQuestionText(question.text)} />
                            <div className="tags">
                                {question.tags.map((tag, index) => (
                                    <span key={index} className="badge">
                                        {typeof tag === 'string' ? tag : tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="asked-by-column">
                            <span className="asked-data"><QuestionCardTiming question={question} /></span>
                            {!isGuest && (
                                <div className="vote-buttons">
                                    {userData.reputation < 50 && (
                                        <>
                                            <button className="up" disabled={true}>Up</button>
                                            <button className="down" disabled={true}>Down</button>
                                        </>
                                    )}
                                    {userData.reputation > 49 && (
                                        <>
                                            <button onClick={() => handleVoteQuestion("upvote")} className="up">Up</button>
                                            <button onClick={() => handleVoteQuestion("downvote")} className="down">Down</button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <CommentsSection type="questions" typeId={question._id} userData={userData} isGuest={isGuest}/>
                    <div className="dotted-line" />
                    <div className="answerText">
                        {answer && (
                            <div key={answer._id}>

                                <div className={"vertical-stacking"}>
                                    <div key={answer._id} className="answer-card" id={"questionBody"}>
                                        <div className="answer-votes-column centered">
                                            <span id={"answerVotes"} className="answer-votes-count">{answer.votes} votes</span>
                                        </div>
                                        <div className="answer-text-column">
                                            <span className="answer-text">
                                                <p style={{"fontSize":"12px"}} dangerouslySetInnerHTML={formatQuestionText(answer.text)} />
                                            </span>
                                        </div>
                                        <div className="asked-by-column answerAuthor">
                                            <span className="asked-data"><AnswerCardTiming answer={answer} /></span>
                                            {!isGuest && (
                                                <div className="vote-buttons">
                                                    {userData.reputation < 50 && (
                                                        <>
                                                        <button style={{"backgroundColor":"#f1f1f1", "cursor":"not-allowed"}} className="up" disabled={true}>Up</button>
                                                        <button style={{"backgroundColor":"#f1f1f1", "cursor":"not-allowed"}} className="down" disabled={true}>Down</button>
                                                        </>
                                                    )}
                                                    {userData.reputation > 49 && (
                                                        <>
                                                            <button onClick={() => handleVoteAnswer(answer._id, "upvote")} className="up">Up</button>
                                                            <button onClick={() => handleVoteAnswer(answer._id, "downvote")} className="down">Down</button>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <CommentsSection type="answers" typeId={answer._id} userData={userData} isGuest={isGuest}/>
                                </div>
                            </div>
                        )}
                        {answer && <div className="dotted-line" />}
                    </div>
                    <div className="answerText">
                        {answers.map((answer, index) => (
                            <div key={answer._id}>
                                <div className={"vertical-stacking"}>
                                    <div key={answer._id} className="answer-card" id={"questionBody"}>
                                        <div className="answer-votes-column centered">
                                            <span className="answer-votes-count">{answer.votes} votes</span>
                                        </div>
                                        <div className="answer-text-column">
                                        <span className="answer-text">
                                            <p style={{"fontSize":"12px"}} dangerouslySetInnerHTML={formatQuestionText(answer.text)} />
                                        </span>
                                        </div>
                                        <div className="asked-by-column answerAuthor">
                                            <span className="asked-data"><AnswerCardTiming answer={answer} /></span>
                                            {!isGuest && (
                                                <div className="vote-buttons">
                                                    {userData.reputation < 50 && (
                                                        <>
                                                            <button className="up" disabled={true}>Up</button>
                                                            <button className="down" disabled={true}>Down</button>
                                                        </>
                                                    )}
                                                    {userData.reputation > 49 && (
                                                        <>
                                                            <button id={"upvoteAnswer"} onClick={() => handleVoteAnswer(answer._id, "upvote")} className="up">Up</button>
                                                            <button id={"downvoteAnswer"} onClick={() => handleVoteAnswer(answer._id, "downvote")} className="down">Down</button>
                                                        </>
                                                    )}
                                                    {userData.username === question.asked_by && (
                                                        <>
                                                            <button onClick={() => handleAcceptAnswer(answer._id)} className="accept">Accept</button>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <CommentsSection type="answers" typeId={answer._id} userData={userData} isGuest={isGuest}/>
                                    </div>
                                </div>
                                {index !== answers.length - 1 && <div className="dotted-line" />}
                            </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="pagination-buttons">
                            {
                                (parseInt(currentPage) === 1) &&
                                <button className="page-button" disabled={true}>Prev</button>
                            }
                            {
                                (parseInt(currentPage) != 1) &&
                                <button onClick={handlePrevPage} className="page-button">Prev</button>
                            }
                            <button onClick={handleNextPage} className="page-button">Next</button>
                        </div>
                    )}
                    {!isGuest && (
                        <div className="button-container">
                            <button type="submit" onClick={handleAnswerQuestion} className="answer-question" >Answer Question</button>
                        </div>
                    )}
                </>
            ) : (
                <AnswerForm onSubmit={handleFormSubmit} />
            )}
        </div>
    );
}

AnswersPage.propTypes = {
    question: PropTypes.object
}