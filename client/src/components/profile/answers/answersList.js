import React, { useEffect, useState } from 'react';
import "./answersList.css"
import AnswerForm from "../answerForm/answerForm";
import formatQuestionText from "../../main/utils";
import axios from "axios";

export default function AnswersList() {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);

    const fetchAnswers = async (page) => {
        try {
            const response = await fetch(`http://localhost:8000/user/answers?page=${page}`, {
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
        } catch (error) {
            console.error('Error fetching answers:', error);
        }
    };

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleAnswerEdit = async (formData) => {
        const apiUrl = `http://localhost:8000/answers/${selectedAnswer._id}`;
        try {
            const response = await axios.put(apiUrl, formData, {withCredentials: true});
            console.log('Answer edited successfully:', response.data);

            fetchAnswers(1);
            setSelectedAnswer(null);
        } catch (error) {
            console.error('Error editing the answer:', error);
        }
    };

    const handleAnswerDelete = async () => {
        const apiUrl = `http://localhost:8000/answers/${selectedAnswer._id}`;
        try {
            const response = await axios.delete(apiUrl, {withCredentials: true});
            console.log('Answer deleted successfully:', response.data);

            fetchAnswers(1);
            setSelectedAnswer(null);
        } catch (error) {
            console.error('Error deleting the answer:', error);
        }
    };

    useEffect(() => {
        fetchAnswers(1);
    }, []);

    function truncateAnswerText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    }

    return (
        <div>
            {selectedAnswer ? (
                <AnswerForm answer={selectedAnswer} onSubmit={handleAnswerEdit} onDelete={handleAnswerDelete}/>
            ) : (
                <>
                    <div className="header-container">
                        <h3>{answers.length} Answers</h3>
                    </div>
                    <div className="answer-cards scrollable-container">
                        {answers.map((answer, index) => (
                            <div key={answer._id}>
                                <div className={"vertical-stacking"}>
                                    <div key={answer._id} className="answer-card">
                                        <div className={"answer-mid"}>
                                            <p className={"postTitle"} onClick={() => handleAnswerClick(answer)}
                                                dangerouslySetInnerHTML={formatQuestionText(truncateAnswerText(answer.text, 50))} />
                                        </div>
                                    </div>
                                </div>
                                {index !== answers.length - 1 && <div className="dotted-line" />}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}