import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Header({
                                   setSearchInput,
                                   setSearchActive,
                                   // userData,
                                   isLoggedIn,
                                   setIsLoggedIn
}) {
    const [searchInput, setSearchInputState] = useState('');


    const handleSearch = () => {
        setSearchInput(searchInput);
        setSearchActive(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false)
    }

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