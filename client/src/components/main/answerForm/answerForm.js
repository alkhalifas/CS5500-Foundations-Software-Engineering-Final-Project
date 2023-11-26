import React, {useEffect, useState} from 'react';
import "./answerForm.css"

export default function AnswerForm({ onSubmit }) {

    const initialFormData = {
        ans_by: '',
        text: '',
    };

    const [userData, setUserData] = useState({ username: '', email: '', reputation: 0, createdOn: ''});
    const [formData, setFormData] = useState(initialFormData);
    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear validation error for the input that's being changed
        setValidationErrors({ ...validationErrors, [name]: null });
    };

    useEffect(() => {
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

        fetchUserData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        if (Object.keys(errors).length === 0) {
            // Set ans_by to userData.username before submitting
            const formDataWithUser = { ...formData, ans_by: userData.username };
            onSubmit(formDataWithUser);
            setFormData(initialFormData);
        } else {
            setValidationErrors(errors);
        }
    };

    const validateForm = (data) => {
        const errors = {};

        // Text validation
        if (!data.text.trim()) {
            errors.text = "Answer text cannot be empty";
        } else {
            // Hyperlinks Validation
            const regex = /\[(.*?)\]\((.*?)\)/g;
            const text = data.text;
            let match;
            while ((match = regex.exec(text)) !== null) {
                const hyperlinkName = match[1];
                const hyperlinkURL = match[2];
                if (!hyperlinkName.trim() || !hyperlinkURL.trim() || !hyperlinkURL.startsWith('https://')) {
                    errors.text = "Invalid hyperlink constraints";
                    break;
                }
            }
        }

        return errors;
    };

    return (
        <form id="newAnswerForm" onSubmit={handleSubmit}>
            <label>
                Answer Text*
                <textarea
                    id="answerTextInput"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    placeholder="Add details"
                    rows="10"
                />
                {validationErrors.text && (
                    <div className="error-message">{validationErrors.text}</div>
                )}
            </label>

            <div className="button-container">
                <button type="submit" className="submit-button">Post Answer</button>
            </div>

            <div className="mandatory-text">* indicates mandatory fields</div>
        </form>
    );
}