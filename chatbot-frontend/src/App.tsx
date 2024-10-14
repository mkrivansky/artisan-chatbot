import React, { useState } from "react";
import axios from "axios";
// import MessageComponent from './components/MessageComponent';
// import MessageItem from './components/MessageComponent'

interface Message {
    id: number;
    text: string;
    responseId?: number
    sender: 'user' | 'bot';
    timestamp: Date;
}

function App() {
    // Use state with type annotations 
    let id = 0;
    const [message, setMessage] = useState<string>("");
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
    
    // Update handleSubmit to include event type
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            // Send a POST request to the backend
            const response = await axios.post<{ response: string }>("http://127.0.0.1:8000/chat", { message });
            
            const responseId = id++;
            const newResponse: Message = {
                id: responseId,
                text: response.data.response,
                sender: 'bot',
                timestamp: new Date(),
            };
            const newMsg: Message = {
                id: id++,
                text: message,
                responseId: responseId,
                sender: 'user',
                timestamp: new Date(),
            };
            setMessages([...messages, newMsg, newResponse]);
            
            setMessage(""); // Clear the input field
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };
    
    const handleEditMessage = (id: number) => {
        setEditingMessageId(id);
        const messageToEdit = messages.find((msg) => msg.id === id);
        if (messageToEdit) {
            setNewMessage(messageToEdit.text);
        }
    };

    const handleDeleteMessage = (id: number) => {
        
        const responseIdToDelete = messages.find(msg => msg.id = id)?.responseId;
        let newMessages = messages.filter(msg => msg.id !== id);
        setMessages(newMessages);
        newMessages = messages.filter(msg => msg.id !== responseIdToDelete);
        setMessages(newMessages);
    };
    
    const handleSaveEdit = () => {
        setMessages(
            messages.map((msg) =>          
                msg.id === editingMessageId ? { ...msg, text: newMessage } : msg
            )
        );
        setEditingMessageId(null);
        setNewMessage('');
    };
    
    return (
        <div>
            <h1>Chatbot</h1>
            <div className="chat-messages"> {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
                >
                {editingMessageId === msg.id ? (
                    <input
                        type="text"
                        value={newMessage}
                        onChange={handleInputChange}
                    />
                ) : (
                    <p>{msg.text}</p>
                    )}
                {msg.sender === 'user' && (
                    <div>
                        <button onClick={() => handleEditMessage(msg.id)}>Edit</button>
                        <button onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                    </div>
                )}
                {editingMessageId === msg.id && (
                    <button onClick={handleSaveEdit}>Save</button>
                )}
                </div>
            ))}
            </div>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default App;
