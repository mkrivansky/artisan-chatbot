// src/hooks/useMessages.ts
import { useState, useEffect } from 'react';
import { Message } from '../types/Message';
import axios from "axios";

export const useMessages = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [suggestedMessage, setSuggestedMessage] = useState<string>("");
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);

    const addMessage = async (text: string, sender: string) => {
        try {
            // Send a POST request to the backend
            console.log(text)
            const response = await axios.post<{ response: string }>("http://127.0.0.1:8000/chat", { text });
            
            const newMsg: Message = {
                id: Date.now().toString(),
                text,
                sender,
                response: response.data.response,
                timestamp: new Date(),
            };
            setMessages((prevMessages) => [...prevMessages, newMsg]);            
        } catch (error) {
            console.error("Error adding message:", error);
        }
    };
    
    const editMessage = async (id: string, newText: string) => {
        try {
            // Send a POST request to the backend
            console.log(newText)
            const response = await axios.post<{ response: string }>("http://127.0.0.1:8000/edit", { newText });

            setMessages(
                messages.map((msg) =>          
                    msg.id === id ? { ...msg, text: newText, response:  response.data.response} : msg
                )
            );
            
        } catch (error) {
            console.error("Error editing message:", error);
        }
    };

    const deleteMessage = (id: string) => {
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
    };

    const addSuggestedMessage = async () => {
        addMessage(suggestedMessage, "user")
    };

    // useEffect(() => {
    //     fetchSuggestions();
    // }, []);

    return { messages, addMessage, editMessage, deleteMessage };
};