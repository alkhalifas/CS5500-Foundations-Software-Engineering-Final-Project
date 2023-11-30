import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./commentsSection.css"

const CommentsSection = ({ type, typeId }) => {
    const [comments, setComments] = useState([]);
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
        setComments(comments.map(comment =>
            comment._id === commentId ? { ...comment, votes: comment.votes + 1 } : comment
        ));
    };

    const changePage = (newPage) => {
        setCurrentPage(newPage);
    };

    if (isLoading) return <div>Loading comments...</div>;

    return (
        <div className="page-container">

            <div className="comments-container">
                {
                    !comments &&
                    <div>No comments yet</div>
                }
                {
                    comments &&
                    <div>Comments:</div>
                }
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

export default CommentsSection;

CommentsSection.propTypes = {
    type: PropTypes.string,
    typeId: PropTypes.string
}