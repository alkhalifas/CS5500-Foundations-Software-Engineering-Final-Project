import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./commentsSection.css"

const CommentsSection = ({ type, typeId, userData }) => {
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isGuest, setIsGuest] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/${type}/${typeId}/comments?page=${currentPage}`);
            const data = await response.json();
            setComments(data.comments);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmitComment();
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/user`, {
                method: 'GET',
                credentials: 'include', // include session cookies
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setIsGuest(false)
        } catch (error) {
            setIsGuest(true)
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchComments();
    }, [type, typeId, currentPage]);



    const handleUpvote = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:8000/vote/comment?type=${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authorization headers if required
                },
                body: JSON.stringify({ commentId, voteType: 'upvote' })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to upvote the comment');
            }

            // Refresh comments to reflect the updated vote count
            fetchComments();
        } catch (error) {
            console.error('Error upvoting comment:', error);
            alert(error.message || "Error occurred while upvoting the comment.");
        }
    };

    const handleSubmitComment = async () => {
        // Reset error message
        setErrorMessage('');

        if (newCommentText.trim().length === 0) {
            setErrorMessage("Comment text cannot be empty.");
            return;
        }

        if (newCommentText.length > 140) {
            setErrorMessage("Comment must be less than 140 characters.");
            return;
        }

        if (userData.reputation < 50) {
            setErrorMessage("User does not have enough reputation.");
            return;
        }

        try {
            const payload = {
                text: newCommentText,
                commented_by: userData.username
            };

            const response = await fetch(`http://localhost:8000/${type}/${typeId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setCurrentPage(1);
            await fetchComments(); //refresh
            setNewCommentText('');
        } catch (error) {
            console.error('Error posting new comment:', error);
            setErrorMessage("Failed to post the comment.");
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(parseInt(currentPage) + 1);
        } else if (currentPage == totalPages) {
            setCurrentPage(1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(parseInt(currentPage) - 1);
        }
    };

    if (isLoading) return <div>Loading comments...</div>;

    return (
        <div className="page-container">
            <div className="comments-container">
                <p style={{"fontSize":"12px"}}>Comments:</p>
                {comments.length === 0 && <div>No comments yet</div>}
                {comments.map(comment => (
                    <div key={comment._id} className="comment">
                        <div>{comment.votes} votes</div>
                        {
                            !isGuest &&
                            <button className="vote-button" onClick={() => handleUpvote(comment._id)}>Vote</button>
                        }

                        <div className="comment-text">{comment.text}</div>
                        <div className="comment-author">{comment.commented_by.username}</div>
                    </div>
                ))}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button className="page-button" onClick={handlePrevPage} disabled={currentPage === 1}> Prev </button>
                        <button className="page-button" onClick={handleNextPage}> Next </button>
                    </div>
                )}
                {
                    !isGuest &&
                    <div className="comments-input-section">
                        <textarea
                            id={"commentInput"}
                            className="textarea-comment"
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            onKeyDown={handleKeyPress} // Handle key press here
                        />
                    </div>
                }
                {
                    errorMessage && <div style={{"color":"red"}} className="error-message">{errorMessage}</div>
                }
            </div>
        </div>
    );
};

CommentsSection.propTypes = {
    type: PropTypes.string.isRequired,
    typeId: PropTypes.string.isRequired,
    userData: PropTypes.object
};

export default CommentsSection;