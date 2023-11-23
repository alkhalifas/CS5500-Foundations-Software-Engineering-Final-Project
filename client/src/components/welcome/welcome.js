import React, {useState} from 'react';
// import PropTypes from 'prop-types';
import './welcome.css';
import Register from "../register/register"

export default function Welcome() {
    const [userSelection, setUserSelection] = useState("register");

    const handleUserChoice = (status) => {
        setUserSelection(status);
    };

    return (
        <div className="welcome-container">
            <div className="message-container">
                <h1>Welcome, Please Select a Login Method</h1>
            </div>
            {
                userSelection==="log-in" &&
                <h1>
                    log in
                </h1>
            }
            {
                userSelection==="register" &&
                <>
                    <Register/>
                </>
            }
            <div className="button-row">
                <div className="button-container">
                    <button className="welcome-button" onClick={() => handleUserChoice('log-in')}>Log In</button>
                    <button className="welcome-button" onClick={() => handleUserChoice('register')}>Register</button>
                    <button className="welcome-button" onClick={() => handleUserChoice('guest')}>Proceed as Guest</button>
                </div>
            </div>
        </div>
    );
}

// Welcome.propTypes = {
//     setUserStatus: PropTypes.func.isRequired
// };
