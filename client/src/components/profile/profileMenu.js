import React, { useState } from "react";
import "./profileMenu.css"
import PropTypes from "prop-types";

export default function profileMenu({ onSelect }) {
    const [selectedButton, setSelectedButton] = useState("questions");

    const handleButtonClick = (button) => {
        setSelectedButton(button);
        onSelect(button);
    };

    return (
        <div className="menu" id={"menu"}>
            <button
                className={selectedButton === "questions" ? "menu-btn dark-active" : "menu-btn"}
                onClick={() => handleButtonClick("questions")}
            >
                Questions
            </button>
            <button
                className={selectedButton === "tags" ? "menu-btn dark-active" : "menu-btn"}
                onClick={() => handleButtonClick("tags")}
            >
                Tags
            </button>
            <button
                className={selectedButton === "answers" ? "menu-btn dark-active" : "menu-btn"}
                onClick={() => handleButtonClick("answers")}
            >
                Answers
            </button>
        </div>
    );
}

profileMenu.propTypes = {
    onSelect: PropTypes.func.isRequired
};