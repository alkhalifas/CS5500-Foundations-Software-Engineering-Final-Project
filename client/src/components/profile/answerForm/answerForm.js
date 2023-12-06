import React, {useEffect, useState} from 'react';
import "./answerForm.css"
import PropTypes from 'prop-types';

export default function AnswerForm({ answer, onSubmit, onDelete }) {

    const [formData, setFormData] = useState({ text: ''});
    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear validation error for the input that's being changed
        setValidationErrors({ ...validationErrors, [name]: null });
    };

    useEffect(() => {
        // Update formData when the answer prop changes
        if (answer) {
            setFormData({
                text: answer.text || ''
            });
        }
    }, [answer]);

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
        onDelete(answer._id);
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
                <button type="submit" className="submit-button">Save</button>
                <button className="delete-button" onClick={handleDelete}>Delete</button>
            </div>

            <div className="mandatory-text">* indicates mandatory fields</div>
        </form>
    );
}

AnswerForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    answer: PropTypes.object
};