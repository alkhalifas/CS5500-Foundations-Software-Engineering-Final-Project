import React, { useEffect, useState, useCallback } from 'react';
import "./AnswersPage.css"
import QuestionCardTiming from "../questionList/QuestionCardTiming.js"
import AnswerCardTiming from "./AnswerCardTiming";
import AnswerForm from "../answerForm/answerForm";
import formatQuestionText from "../utils";
import axios from "axios";
import PropTypes from 'prop-types';
import CommentsSection from "../comments/commentsSection"

export default function AnswersPage({question}) {
    const [answers, setAnswers] = useState([]);
    const [answer, setAcceptedAnswer] = useState();
    const [views, setViews] = useState(0);
    const [votes, setVotes] = useState();
    const [showAnswerForm, setShowAnswerForm] = useState(false);
    const [totalResults, setTotalResults] = useState();
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [userData, setUserData] = useState({ username: '', email: '', reputation: 0, createdOn: ''});
    const [isGuest, setIsGuest] = useState(true);


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

    const updateSortedAnswers = useCallback((page) => {
        const answerUrl = `http://localhost:8000/questions/${question._id}/answers?page=${page}`;
        axios.get(answerUrl)
            .then(response => {
                setAnswers(response.data.answers);
                setCurrentPage(response.data.currentPage);
                setTotalResults(response.data.totalAnswers);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching answers:', error);
            });
    }, [question._id]);

    const updateAcceptedAnswer = useCallback(() => {
        const answerUrl = `http://localhost:8000/questions/${question._id}/accepted-answer`;
        axios.get(answerUrl)
            .then(response => {
                setAcceptedAnswer(response.data);
            })
            .catch(error => {
                console.error('Error fetching accepted answer:', error);
            });
    }, [question._id]);

    useEffect(() => {
        // Increment views when the component is mounted
        const viewUrl = `http://localhost:8000/questions/increment-views/${question._id}`;
        axios.post(viewUrl)
            .then(response => {
                console.log('Views incremented successfully:', response.data);
                setViews(question.views + 1);
                setVotes(question.votes);
            })
            .catch(error => {
                console.error('Error incrementing views:', error);
            });

        updateSortedAnswers(1);
        updateAcceptedAnswer();
        fetchUserData();

    }, [question._id, question.views, updateSortedAnswers]);

    const handleAnswerQuestion = () => {
        setShowAnswerForm(true);
    };

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

    const handleVoteQuestion = async (voteType) => {
        const apiUrl = `http://localhost:8000/vote/question`;
        try {
            const response = await axios.post(apiUrl, {
                questionId: question._id,
                voteType: voteType
            });
            console.log('Question voted successfully:', response.data);
            setVotes(response.data.newVotes);
        } catch (error) {
            console.error('Error voting the question:', error);
        }
    };

    const updateAnswerVote = (answerId, voteType) => {
        const updatedAnswers = answers.map((answer) => {
            if (answer._id === answerId) {
                return {
                    ...answer,
                    votes: voteType === 'upvote' ? answer.votes + 1 : answer.votes - 1,
                };
            }
            return answer;
        });
        setAnswers(updatedAnswers);
    };

    const handleVoteAnswer = async (answerId, voteType) => {
        const apiUrl = `http://localhost:8000/vote/answer`;
        try {
            const response = await axios.post(apiUrl, {
                answerId: answerId,
                voteType: voteType
            });
            console.log('Answer voted successfully:', response.data);
            updateAnswerVote(answerId, voteType);
        } catch (error) {
            console.error('Error voting the answer:', error);
        }
    };

    // const handleAcceptAnswer = async (answerId) => {
    //     const apiUrl = `http://localhost:8000/accept-answer`;
    //     try {
    //         const response = await axios.post(apiUrl, {
    //             answerId: answerId,
    //             questionId: question._id
    //         });
    //         console.log('Answer accepted successfully:', response.data);
    //
    //         await updateAcceptedAnswer();
    //         await updateSortedAnswers(1);
    //     } catch (error) {
    //         console.error('Error accepting the answer:', error);
    //     }
    // };

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
                                {question.tags.map(tag => (
                                    <span key={tag} className="badge">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="asked-by-column">
                            <span className="asked-data"><QuestionCardTiming question={question} /></span>
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
                                        {userData.username != "" && (
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
                                            {userData.username != "" && (
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
                                <button style={{"backgroundColor":"#f1f1f1", "cursor":"not-allowed"}} className="prev" disabled={true}>Prev</button>
                            }
                            {
                                (parseInt(currentPage) != 1) &&
                                <button onClick={handlePrevPage} className="prev">Prev</button>
                            }
                            <button onClick={handleNextPage} className="next">Next</button>
                        </div>
                    )}
                    {userData.username != "" && (
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
    question: PropTypes.func.isRequired
}