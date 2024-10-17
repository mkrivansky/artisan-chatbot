// src/components/Chat.tsx
import React, { useEffect, useState } from 'react';
import { useMessages } from '../hooks/useMessages';
import Message from './Message';
import MessageInput from './MessageInput';
import axios from "axios";
import './Chat.css'
import './Message.css'
// import styled from 'styled-components';

const Chat: React.FC = () => {
    const { messages, addMessage, editMessage, deleteMessage } = useMessages();
    const [suggestedMessage, setSuggestedMessage] = useState("");

    const handleSend = (text: string) => {
        addMessage(text, 'User'); // For simplicity, hardcoding sender as 'User'
    };

    const fetchSuggestions = async () => {
        try {
            // Send a POST request to the backend
            const response = await axios.get<{ response: string }>("http://127.0.0.1:8000/suggestion");

            setSuggestedMessage(response.data.response);
            console.log(suggestedMessage);
            
        } catch (error) {
            console.error("Error fetching message:", error);
        }
    };

    const sendSuggestion = (text: string) => {
        addMessage(text, 'User'); // For simplicity, hardcoding sender as 'User'
        fetchSuggestions();
    };

    useEffect(() => {
        fetchSuggestions();
    }, []);

    return (
        <div className='chat-container'>
            <div>
                {messages.map((message) => (
                    <div>
                        <Message
                            key={message.id}
                            message={message}
                            onEdit={editMessage}
                            onDelete={deleteMessage}
                        />
                    </div>
                ))}
            </div>
            <div>
                {messages.length == 0 ? (
                    <div>
                        <div className='message-bot-container'>
                            <p className='message-bot-text'>Hi! How can I help you today?</p>
                            <span className='message-bot-sender'>Ava - {new Date().toLocaleString()}</span>
                        </div>
                        <div className='button-suggestion' onClick={() => sendSuggestion(suggestedMessage)}>{suggestedMessage}</div>
                    </div>
                ) : (
                    <div className='button-suggestion' onClick={() => sendSuggestion(suggestedMessage)}>{suggestedMessage}</div>
                )}
            </div>
            <MessageInput onSend={handleSend} />
        </div>
    );
};

export default Chat;
