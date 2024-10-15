import React, { useState } from "react";
import axios from "axios";
import MessageItem from "./components/MessageItem";
import ResponseItem from "./components/ResponseItem";

interface Message {
    id: string;
    text: string;
    response?: string
    timestamp: Date;
}

function App() {
    // Use state with type annotations 
    const [message, setMessage] = useState<string>("");
    const [newMessage, setNewMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    
    // Update handleSubmit to include event type
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            // Send a POST request to the backend
            console.log(message)
            const response = await axios.post<{ response: string }>("http://127.0.0.1:8000/chat", { message });
            
            const newMsg: Message = {
                id: Date.now().toString(),
                text: message,
                response: response.data.response,
                timestamp: new Date(),
            };
            setMessages([...messages, newMsg]);
            
            setMessage(""); // Clear the input field
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };
    
    const handleEditMessage = (id: string) => {
        setEditingMessageId(id);
        const messageToEdit = messages.find((msg) => msg.id === id);
        if (messageToEdit) {
            setNewMessage(messageToEdit.text);
        }
    };

    const handleDeleteMessage = (id: string) => {
        
        const newMessages = messages.filter(msg => msg.id !== id);
        setMessages(newMessages);
    };
    
    const handleSaveEdit = async () => {        
        try {
            // Send a POST request to the backend
            console.log(newMessage)
            const response = await axios.post<{ response: string }>("http://127.0.0.1:8000/edit", { newMessage });

            setMessages(
                messages.map((msg) =>          
                    msg.id === editingMessageId ? { ...msg, text: newMessage, response:  response.data.response} : msg
                )
            );
            
        } catch (error) {
            console.error("Error sending message:", error);
        }
        setEditingMessageId(null);
        setNewMessage('');
    };
    
    return (
        <div>
            <h1>Chatbot</h1>
            <div className="chat-messages"> {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={"message user"}
                >
                {editingMessageId === msg.id ? (
                    <input
                        type="text"
                        value={newMessage}
                        onChange={handleInputChange}
                    />
                ) : (
                <div>
                    <span>
                    <div><MessageItem message={msg.text}/>
                    <button onClick={() => handleEditMessage(msg.id)}>Edit</button>
                    <button onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                    </div>
                    </span>
                    <div><ResponseItem response={msg.response!}/></div>
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
