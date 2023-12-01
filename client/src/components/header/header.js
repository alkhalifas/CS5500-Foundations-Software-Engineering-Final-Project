import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

export default function Header({
                                   setSearchInput,
                                   setSearchActive,
                                   // userData,
                                   isLoggedIn,
                                   setIsLoggedIn
}) {
    const [searchInput, setSearchInputState] = useState('');
    const [userData, setUserData] =useState(null);


    const checkSessionStatus = () => {
        axios.get('http://localhost:8000/session-status', { withCredentials: true })
            .then(response => {
                if (response.data.isLoggedIn) {
                    setIsLoggedIn(true);
                    setUserData(response.data.user); // Assuming the server sends some user data
                    console.log("HEADER response: ", response)
                    console.log("HEADER userData: ", userData)
                    console.log("USER LOGGED IN")
                } else {
                    setIsLoggedIn(false);
                    setUserData(null);
                    console.log("NOT LOGGED IN")
                }
            })
            .catch(error => {
                console.error('Error checking session status:', error);
                // Handle error appropriately
            });
    };


    const handleSearch = () => {
        setSearchInput(searchInput);
        setSearchActive(true);
    };

    const handleLogout = () => {
        axios.post('http://localhost:8000/logout', {}, { withCredentials: true })
            .then(() => {
                setIsLoggedIn(false);
                console.log("Logged out successfully");
                // Perform any additional actions on logout
            })
            .catch(error => {
                console.error('Logout error:', error);
            });
    };

    useEffect(() => {

        checkSessionStatus();


    }, []);

    return (
        <>
            <div className="header">
                Fake Stack Overflow
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        id="searchBar"
                        value={searchInput}
                        onChange={(e) => setSearchInputState(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                </div>
                {
                    isLoggedIn &&
                    <>
                        {/*<p style={{"fontSize":"16px"}}>Welcome, {userProfile.username}</p>*/}
                        <button className="welcome-button" onClick={() => handleLogout()}>Logout</button>
                    </>
                }
            </div>
        </>
    );
}

Header.propTypes = {
    setSearchInput: PropTypes.func.isRequired,
    setSearchActive: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool,
    setIsLoggedIn: PropTypes.func.isRequired,
    // userData: PropTypes.object
};