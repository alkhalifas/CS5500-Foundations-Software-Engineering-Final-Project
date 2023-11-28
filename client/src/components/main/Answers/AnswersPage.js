import React, { useEffect, useState, useCallback } from 'react';
import "./AnswersPage.css"
import QuestionCardTiming from "../questionList/QuestionCardTiming.js"
import AnswerCardTiming from "./AnswerCardTiming";
import AnswerForm from "../answerForm/answerForm";
import formatQuestionText from "../utils";
import axios from "axios";
import PropTypes from 'prop-types';

export default function AnswersPage({question}) {
    const [answers, setAnswers] = useState([]);
    const [views, setViews] = useState(0);
    const [votes, setVotes] = useState();
    const [showAnswerForm, setShowAnswerForm] = useState(false);
    const [totalResults, setTotalResults] = useState();
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [userData, setUserData] = useState({ username: '', email: '', reputation: 0, createdOn: ''});

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
            console.error('Error voting the question:', error);
        }
    };

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
                            <div className="vote-buttons">
                                <button onClick={() => handleVoteQuestion("upvote")} className="up">Up</button>
                                <button onClick={() => handleVoteQuestion("downvote")} className="down">Down</button>
                            </div>
                        </div>
                    </div>
                    <div className="dotted-line" />
                    <div className="answerText">
                        {answers.map((answer, index) => (
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
                                        <div className="vote-buttons">
                                            <button onClick={() => handleVoteAnswer(answer._id, "upvote")} className="up">Up</button>
                                            <button onClick={() => handleVoteAnswer(answer._id, "downvote")} className="down">Down</button>
                                        </div>
                                    </div>
                                </div>
                                {index !== answers.length - 1 && <div className="dotted-line" />}
                            </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="pagination-buttons">
                            <button onClick={handlePrevPage} className="prev" disabled={currentPage === 1}>Prev</button>
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