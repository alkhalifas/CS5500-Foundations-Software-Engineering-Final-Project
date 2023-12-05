import React, {useEffect, useState} from 'react';
import QuestionCardTiming from "../questionList/QuestionCardTiming";
import formatQuestionText from "../utils";
import AnswersPage from "../Answers/AnswersPage";
import axios from "axios";
import PropTypes from 'prop-types';

export default function TagQuestionsList({ tag }) {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [totalResults, setTotalResults] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        // console.log("TQL question: ", question)
    };

    const fetchQuestions = async (page) => {
        const apiUrl = `http://localhost:8000/questions/tag-id/${tag._id}?page=${page}`;
        try {
            const response = await axios.get(apiUrl);
            setQuestions(response.data.questions);
            setCurrentPage(response.data.currentPage);
            setTotalResults(response.data.totalQuestions);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            fetchQuestions(parseInt(currentPage) + 1);
        } else if (currentPage == totalPages) {
            fetchQuestions(1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            fetchQuestions(parseInt(currentPage) - 1);
        }
    };

    useEffect(() => {
        fetchQuestions(1);
    }, [tag._id]);

    return (
        <>
            <div className="header-container">
                <h3>{totalResults} questions</h3>
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
                        {questions.map((question, index) => (
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
        </>
    );
}

TagQuestionsList.propTypes = {
    tag: PropTypes.object.isRequired
};