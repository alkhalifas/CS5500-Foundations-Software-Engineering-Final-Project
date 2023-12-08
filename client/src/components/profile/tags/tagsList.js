import React, {useEffect, useState} from 'react';
import "./tagsList.css"
import axios from "axios";

export default function TagsList() {
    const [tags, setTags] = useState([]);
    const [editingTagId, setEditingTagId] = useState(null);
    const [editedTagName, setEditedTagName] = useState('');

    const fetchTags = async () => {
        try {
            const response = await fetch(`http://localhost:8000/user/tags`, {
                method: 'GET',
                credentials: 'include', // include session cookies
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            setTags(responseData);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    const handleDelete = async (tagId) => {
        const apiUrl = `http://localhost:8000/tags/${tagId}`;
        try {
            const response = await axios.delete(apiUrl);
            console.log('Tag deleted successfully:', response.data);

            fetchTags();
        } catch (error) {
            console.error('Error deleting the tag:', error);
        }
    };

    const handleEdit = (tagId) => {
        setEditingTagId(tagId);
        const tagToEdit = tags.find(tag => tag._id === tagId);
        setEditedTagName(tagToEdit.name);
    };

    const handleSaveEdit = async () => {
        const apiUrl = `http://localhost:8000/tags/${editingTagId}`;
        try {
            const response = await axios.put(apiUrl, {name: editedTagName});
            console.log('Tag edited successfully:', response.data);

            // Update the tags list after editing
            const updatedTags = tags.map(tag =>
                tag._id === editingTagId ? { ...tag, name: editedTagName } : tag
            );

            setTags(updatedTags);
            setEditingTagId(null);
            setEditedTagName('');
        } catch (error) {
            console.error('Error editing the tag:', error);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <div>
            <div className="header-container">
                <h3>{tags.length} Tags</h3>
            </div>
            <div className="tags-container">
                {tags.map((tag) => (
                    <div key={tag._id} className="tag-box tagNode">
                        {editingTagId === tag._id ? (
                            <>
                                <input
                                    id={"tagInputField"}
                                    type="text"
                                    value={editedTagName}
                                    onChange={(e) => setEditedTagName(e.target.value)}
                                />
                                <button onClick={handleSaveEdit} className="page-button">Save</button>
                            </>
                        ) : (
                            <>
                                <span>{tag.name}</span>
                                <p>({tag.count} questions)</p>
                                <button onClick={() => handleDelete(tag._id)} className="page-button">Delete</button>
                                <button onClick={() => handleEdit(tag._id)} className="page-button">Edit</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}