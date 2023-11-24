import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Header({
                                   setSearchInput,
                                   setSearchActive,
                                   setUserSession,
                                   userSession,
                                   userProfile
}) {
    const [searchInput, setSearchInputState] = useState('');

    // useEffect(() => {
    //
    //     const checkUserSession = () => {
    //         const token = localStorage.getItem('token');
    //         console.log("checkUserSession storage", token)
    //         setUserSession(token);
    //     };
    //
    //     checkUserSession();
    //
    //     window.addEventListener('storage', checkUserSession);
    //
    //     return () => {
    //         window.removeEventListener('storage', checkUserSession);
    //     };
    //
    // }, []);

    const handleSearch = () => {
        setSearchInput(searchInput);
        setSearchActive(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUserSession(null)
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
                    userSession &&
                    <>
                        <p style={{"fontSize":"16px"}}>Welcome, {userProfile.username}</p>
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
    setUserSession: PropTypes.func.isRequired,
    userSession: PropTypes.string,
    userProfile: PropTypes.object
};