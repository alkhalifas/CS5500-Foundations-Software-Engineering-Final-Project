import React, {useEffect, useState} from 'react';
import QuestionCardTiming from "../questionList/QuestionCardTiming";
import formatQuestionText from "../utils";
import AnswersPage from "../Answers/AnswersPage";
import axios from "axios";
import PropTypes from 'prop-types';

export default function TagQuestionsList({ tag }) {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 5;

    useEffect(() => {
        const apiUrl = `http://localhost:8000/questions/tag-id/${tag._id}`;
        axios.get(apiUrl)
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, [tag._id]);

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
    };

    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const handleNextPage = () => {
        if (indexOfLastQuestion < questions.length) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="header-container">
                <h3>{questions.length} questions</h3>
                <h3 className={"blue-filter"}>Filter: {`"${tag.name}"`}</h3>
            </div>

            {selectedQuestion ? (
                <div id={"answersHeader"}>
                    <div className="header-container">
                    </div>
                    <AnswersPage question={selectedQuestion} />

                </div>
            ) : (
                <>
                    <div className="question-cards">
                        {currentQuestions.map((question, index) => (
                            <div key={question._id}>
                                <div
                                    key={question._id}
                                    className="question-card"
                                >
                                    <div className={"question-left postStats"}>
                                        <p>{question.views} views</p>
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
                                                <span key={tag.id} className="badge">{tag.name}</span>
                                            ))}
                                        </div>

                                    </div>
                                    <div className={"question-right lastActivity"}>
                                        <QuestionCardTiming question={question} />
                                    </div>
                                </div>
                                {index !== questions.length - 1 && <div className="dotted-line" />}
                            </div>
                        ))}
                    </div>
                    {questions.length > questionsPerPage && (
                        <div className="pagination-buttons">
                            <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
                            <button onClick={handleNextPage}>Next</button>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

TagQuestionsList.propTypes = {
    tag: PropTypes.func.isRequired
};