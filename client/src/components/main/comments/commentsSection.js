import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./commentsSection.css"

const CommentsSection = ({ type, typeId, userData }) => {
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/${type}/${typeId}/comments?page=${currentPage}`);
            const data = await response.json();
            setComments(data.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [type, typeId, currentPage]);

    const handleUpvote = async (commentId) => {
        // Implement upvote functionality later // todo
        console.log("commentId: ", commentId)
    };

    const handleSubmitComment = async () => {
        if (newCommentText.trim().length === 0) {
            alert("Comment text cannot be empty.");
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
            alert("Failed to post the comment.");
        }
    };



    const changePage = (newPage) => {
        setCurrentPage(newPage);
    };

    if (isLoading) return <div>Loading comments...</div>;

    return (
        <div className="page-container">
            <div className="comments-container">
                <textarea
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button onClick={handleSubmitComment}>Post Comment</button>

                {comments.length === 0 && <div>No comments yet</div>}
                {comments.map(comment => (
                    <div key={comment._id} className="comment">
                        <div>{comment.votes} votes</div>
                        <button className="vote-button" onClick={() => handleUpvote(comment._id)}>Vote</button>
                        <div className="comment-text">{comment.text}</div>
                        <div className="comment-author">{comment.commented_by.username}</div>
                    </div>
                ))}
                <div className="pagination">
                    <button className="page-button" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}> {"<"} </button>
                    <button className="page-button" onClick={() => changePage(currentPage + 1)}> {">"} </button>
                </div>
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
