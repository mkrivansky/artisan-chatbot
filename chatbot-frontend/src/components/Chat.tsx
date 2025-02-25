// src/components/Chat.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useMessages } from '../hooks/useMessages';
import Message from './Message';
import MessageInput from './MessageInput';
import axios from "axios";
import '../styles/Chat.css'
import '../styles/Message.css'

const Chat: React.FC = () => {
    const { messages, addMessage, editMessage, deleteMessage } = useMessages();
    const [suggestedMessage, setSuggestedMessage] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleSend = (text: string) => {
        addMessage(text, 'User');
    };

    const fetchSuggestions = async () => {
        try {            const response = await axios.get<{ response: string }>("http://127.0.0.1:8000/suggestion");

            setSuggestedMessage(response.data.response);
            console.log(suggestedMessage);
            
        } catch (error) {
            console.error("Error fetching message:", error);
        }
    };

    const sendSuggestion = (text: string) => {
        addMessage(text, 'User');
        fetchSuggestions();
    };

    useEffect(() => {
        fetchSuggestions();
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight, 
                behavior: "smooth",
            });
        }
    }, [messages]);

    return (
        <div className='container'>
            <div className='chat-container' ref={chatContainerRef}>
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
                    {messages.length === 0 ? (
                        <div>
                            <div className='message-bot-container'>
                                <img src={require('../assets/images/ava.png')} className="ava-pic" />
                                <p className='message-bot-text'>Hi! How can I help you today?</p>
                                <span className='message-bot-sender'>Ava - {new Date().toLocaleString()}</span>
                            </div>
                            <div className='button-suggestion' onClick={() => sendSuggestion(suggestedMessage)}>{suggestedMessage}</div>
                        </div>
                    ) : (
                        <div className='button-suggestion' onClick={() => sendSuggestion(suggestedMessage)}>{suggestedMessage}</div>
                    )}
                </div>
            </div>
            <MessageInput onSend={handleSend} />
        </div>
    );
};

export default Chat;
