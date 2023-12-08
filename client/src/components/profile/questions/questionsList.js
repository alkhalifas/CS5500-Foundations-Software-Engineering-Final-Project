import React, {useEffect, useState} from 'react';
import "./questionList.css";
import QuestionForm from "../questionForm/questionForm";
import axios from "axios";

export default function QuestionsList() {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [sortedQuestions, setSortedQuestions] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState([]);

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
    };

    const handleQuestionEdit = async (formData) => {
        const apiUrl = `http://localhost:8000/questions/${selectedQuestion._id}`;
        try {
            const response = await axios.put(apiUrl, formData);
            console.log('Question edited successfully:', response.data);

            fetchQuestions(1);
            setSelectedQuestion(null);
        } catch (error) {
            console.error('Error editing the question:', error);
        }
    };

    const handleQuestionDelete = async () => {
        const apiUrl = `http://localhost:8000/questions/${selectedQuestion._id}`;
        try {
            const response = await axios.delete(apiUrl);
            console.log('Question deleted successfully:', response.data);

            fetchQuestions(1);
            setSelectedQuestion(null);
        } catch (error) {
            console.error('Error deleting the question:', error);
        }
    };

    const fetchQuestions = async (page) => {
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
            setTotalResults(responseData.totalQuestions);
            setSortedQuestions(responseData.questions);
            setCurrentPage(responseData.currentPage);
            setTotalPages(responseData.totalPages);
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
    }, []);

    return (
        <div>
            {selectedQuestion ? (
                <div id={"answersHeader"}>
                    <QuestionForm question={selectedQuestion} onSubmit={handleQuestionEdit} onDelete={handleQuestionDelete} />
                </div>
            ) : (
                <>
                    <div className="header-container">
                        <h3>{totalResults} Questions</h3>
                    </div>
                    <div className="question-cards scrollable-container">
                        {sortedQuestions.map((question, index) => (
                            <div key={question._id}>
                                <div
                                    key={question._id}
                                    className="question-card"
                                >
                                    <div className={"question-mid"}>
                                        <p className={"postTitle"}
                                            onClick={() => handleQuestionClick(question)}
                                        >{question.title}
                                        </p>
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
}