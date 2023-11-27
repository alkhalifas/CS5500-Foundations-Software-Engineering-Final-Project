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
    const [views, setViews] = useState([]);
    const [votes, setVotes] = useState([]);
    const [showAnswerForm, setShowAnswerForm] = useState(false);
    const [totalResults, setTotalResults] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);

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
                setVotes(question.votes); // Increment it when a question is voted // Pending
            })
            .catch(error => {
                console.error('Error incrementing views:', error);
            });

        updateSortedAnswers(1);

    }, [question._id, question.views, updateSortedAnswers]);

    const handleAnswerQuestion = () => {
        setShowAnswerForm(true);
    };

    const handleFormSubmit = async (formData) => {
        const apiUrl = `http://localhost:8000/questions/${question._id}/answers`;

        try {
            const response = await axios.post(apiUrl, formData);
            console.log('Answer added successfully:', response.data);

            await updateSortedAnswers();
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
                        <div className="views-column">
                            <span className="views-count">{views} views</span>
                        </div>
                        <div className="votes-column">
                            <span className="votes-count">{votes} votes</span>
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
                        </div>
                    </div>
                    <div className="dotted-line" />
                    <div className="answerText">
                        {answers.map((answer, index) => (
                            <div key={answer.aid}>
                                <div key={answer.aid} className="answer-card" id={"questionBody"}>
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
                                    </div>
                                </div>
                                {index !== answers.length - 1 && <div className="dotted-line" />}
                            </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="pagination-buttons">
                            <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
                            <button onClick={handleNextPage}>Next</button>
                        </div>
                    )}
                    <div className="button-container">
                        <button type="submit" onClick={handleAnswerQuestion} className="answer-question" >Answer Question</button>
                    </div>
                </>
            ) : (
                <AnswerForm onSubmit={handleFormSubmit} />
            )}
        </div>
    );
}

AnswersPage.propTypes = {
    question: PropTypes.func.isRequired
};