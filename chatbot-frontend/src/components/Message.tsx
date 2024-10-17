// src/components/Message.tsx
import React, { useEffect, useState } from 'react';
import { Message as MessageType } from '../types/Message';
// import styled from 'styled-components';
import './Message.css'

const Message: React.FC<{
    message: MessageType;
    onEdit: (id: string, newText: string) => void;
    onDelete: (id: string) => void;
    // onSuggestion: (text: string) => void;
}> = ({ message, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(message.text);

    const handleEdit = () => {
        onEdit(message.id, newText);
        setIsEditing(false);
    };

    return (
        <div>
            <div className='message-user-container'>
                {isEditing ? (
                    <>
                        <input className='edit-input'
                            type="text"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                        />
                        <div className='button-container'>
                            <button className='button' onClick={handleEdit}>Save</button>
                            <button className='button' onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className='message-user-text'>{message.text}</p>
                        <span className='message-user-sender'>{message.sender} - {message.timestamp.toLocaleString()}</span>
                        <div className='button-container'>
                            <button className='button' onClick={() => setIsEditing(true)}>Edit</button>
                            <button className='button' onClick={() => onDelete(message.id)}>Delete</button>
                        </div>
                    </>
                )}
            </div>
            <div className='message-bot-container'>
            {isEditing ? (
                <>
                    <p className='message-bot-text'>Don't worry, I'll wait...</p>
                    <span className='message-bot-sender'>Ava - {message.timestamp.toLocaleString()}</span>
                </>
            ) : (
                <>
                    <p className='message-bot-text'>{message.response!}</p>
                    <span className='message-bot-sender'>Ava - {message.timestamp.toLocaleString()}</span>
                </>
            )}
            </div>
        </div>
    );
};

export default Message;
