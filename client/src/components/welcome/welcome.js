import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './welcome.css';
import Register from "../register/register"
import Login from "../login/login"

export default function Welcome({setUserSession}) {
    const [userSelection, setUserSelection] = useState("log-in");
    const [registerSuccess, setRegisterSuccess] = useState(false);


    const handleUserChoice = (status) => {
        setUserSelection(status);
    };

    return (
        <div className="welcome-container">
            <div className="message-container">
                <h1>Welcome, Please Select a Method to Proceed</h1>
            </div>
            {
                userSelection==="log-in" &&
                <>
                    <Login setUserSession={setUserSession} registerSuccess={registerSuccess}/>
                </>
            }
            {
                userSelection==="register" &&
                <>
                    <Register setUserSession={setUserSession} setRegisterSuccess={setRegisterSuccess} setUserSelection={setUserSelection}/>
                </>
            }
            <div className="button-row">
                <div className="button-container">
                    <span className="welcome-link" onClick={() => handleUserChoice('log-in')}>Log In</span>
                    <span className="welcome-link" onClick={() => handleUserChoice('register')}>Register</span>
                    <span className="welcome-link" onClick={() => handleUserChoice('guest')}>Proceed as Guest</span>
                </div>
            </div>
            {/*<div className="button-row">*/}
            {/*    <div className="button-container">*/}
            {/*        <button className="welcome-button" onClick={() => handleUserChoice('log-in')}>Log In</button>*/}
            {/*        <button className="welcome-button" onClick={() => handleUserChoice('register')}>Register</button>*/}
            {/*        <button className="welcome-button" onClick={() => handleUserChoice('guest')}>Proceed as Guest</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

Welcome.propTypes = {
    setUserSession: PropTypes.func.isRequired
};
