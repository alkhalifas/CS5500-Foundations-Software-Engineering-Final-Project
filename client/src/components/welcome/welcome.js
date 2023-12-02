import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './welcome.css';
import Register from "../register/register"
import Login from "../login/login"

export default function Welcome({setIsLoggedIn, setIsGuest}) {
    const [userSelection, setUserSelection] = useState("log-in");
    const [registerSuccess, setRegisterSuccess] = useState(false);


    const handleUserChoice = (status) => {
        setUserSelection(status);
        // console.log("userSelection: ", userSelection)
    };

    const handleGuestUser = () => {
        setIsGuest(true)
    }

    return (
        <div className="welcome-container">
            <div className="message-container">
                <h1>Welcome, Please Select a Method to Proceed</h1>
            </div>
            {
                userSelection==="log-in" &&
                <>
                    <Login setIsLoggedIn={setIsLoggedIn} registerSuccess={registerSuccess}/>
                </>
            }
            {
                userSelection==="register" &&
                <>
                    <Register setIsLoggedIn={setIsLoggedIn} setRegisterSuccess={setRegisterSuccess} setUserSelection={setUserSelection}/>
                </>
            }
            <div className="button-row">
                <div className="button-container">
                    <span className="welcome-link" onClick={() => handleUserChoice('log-in')}>Log In</span>
                    <span className="welcome-link" onClick={() => handleUserChoice('register')}>Register</span>
                    <span className="welcome-link" onClick={() => handleGuestUser()}>Proceed as Guest</span>
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
    setIsLoggedIn: PropTypes.func.isRequired,
    setIsGuest: PropTypes.func.isRequired
};
