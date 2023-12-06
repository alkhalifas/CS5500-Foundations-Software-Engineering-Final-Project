import React, {useEffect, useState} from 'react';
import "./questionForm.css"
import PropTypes from 'prop-types';
import axios from "axios";

export default function QuestionForm({ question, onSubmit, onDelete }) {

    const [formData, setFormData] = useState({ title: '', text: '', tags: ''});
    const [userData, setUserData] = useState({ username: '', email: '', reputation: 0, createdOn: ''});
    const [validationErrors, setValidationErrors] = useState({});
    const [existingTags, setExistingTags] = useState([]);

    useEffect(() => {
        // Update formData when the question prop changes
        if (question) {
            setFormData({
                title: question.title || '',
                text: question.text || '',
                tags: question.tags ? question.tags.join(' ') : ''
            });
        }
    }, [question]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/user`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setUserData(data);
                console.log("data: ", data)
            } catch (error) {
                console.error('Error fetching user data:', error);
                // setError(error.message);
            }
        };

        fetchUserData();
        fetchExistingTags();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear validation error for the input that's being changed
        setValidationErrors({ ...validationErrors, [name]: null });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        if (Object.keys(errors).length === 0) {
            onSubmit(formData);
        } else {
            setValidationErrors(errors);
        }
    };

    const handleDelete = () => {
        onDelete(question._id);
    };

    const fetchExistingTags = async () => {
        const apiUrl = `http://localhost:8000/tags`;
        try {
            const response = await axios.get(apiUrl);
            const tagNames = response.data.map(tag => tag.name);
            setExistingTags(tagNames);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    const validateForm = (data) => {
        const errors = {};

        // Title validation
        if (!data.title.trim()) {
            errors.title = "Title cannot be empty";
        } else if (data.title.length > 100) {
            errors.title = "Title cannot be more than 100 characters";
        }

        // Text validation
        if (!data.text.trim()) {
            errors.text = "Question text cannot be empty";
        } else {
            // Hyperlinks Validation
            const regex = /\[(.*?)\]\((.*?)\)/g;
            const text = data.text;
            let match;
            while ((match = regex.exec(text)) !== null) {
                const hyperlinkName = match[1];
                const hyperlinkURL = match[2];
                if (!hyperlinkName.trim() || !hyperlinkURL.trim() || !hyperlinkURL.startsWith('https://')) {
                    errors.text = "Invalid hyperlink";
                    break;
                }
            }
        }

        // Tags validation
        if (!data.tags.trim()) {
            errors.tags = "Tags cannot be empty";
        } else {
            const tagNames = data.tags.trim().split(/\s+/);
            if (tagNames.length > 5) {
                errors.tags = "Cannot have more than 5 tags";
            }
            // Check if the tags already exists
            if (userData.reputation < 50) {
                for (const tag of tagNames) {
                    if (!existingTags.includes(tag.toLowerCase())) {
                        errors.tags = "Only a user with reputation of 50 or more can create a new tag";
                        break;
                    }
                }
            } else {
                for (const tag of tagNames) {
                    if (tag.length > 20) {
                        errors.tags = "Tag length cannot be more than 20";
                        break;
                    }
                }
            }
        }

        return errors;
    };

    return (
        <form id="newQuestionForm" onSubmit={handleSubmit}>
            <label>
                Question Title*
                <input
                    type="text"
                    id="formTitleInput"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Limit title to 100 characters or less"
                />
                {validationErrors.title && (
                    <div className="error-message">{validationErrors.title}</div>
                )}
            </label>
            <label>
                Question Text*
                <textarea
                    id="formTextInput"
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
            <label>
                Tags*
                <input
                    type="text"
                    id="formTagInput"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Add keywords separated by whitespace"
                    //required
                />
                {validationErrors.tags && (
                    <div className="error-message">{validationErrors.tags}</div>
                )}
            </label>

            <div className="button-container">
                <button type="submit" className="submit-button">Save</button>
                <button className="delete-button" onClick={handleDelete}>Delete</button>
            </div>

            <div className="mandatory-text">* indicates mandatory fields</div>
        </form>
    );
}

QuestionForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    question: PropTypes.object
};