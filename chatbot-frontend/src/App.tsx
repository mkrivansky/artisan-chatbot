import React, { useState } from "react";
import axios from "axios";

// Define a type for the response object
interface ChatResponse {
    user: string;
    bot: string;
}

function App() {
    // Use state with type annotations
    const [message, setMessage] = useState<string>("");
    const [responses, setResponses] = useState<ChatResponse[]>([]);

    // Update handleSubmit to include event type
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Send a POST request to the backend
            const response = await axios.post<{ response: string }>("http://127.0.0.1:8000/chat", { message });

            // Update responses state
            setResponses([...responses, { user: message, bot: response.data.response }]);
            setMessage(""); // Clear the input field
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div>
            <h1>Chatbot</h1>
            <div>
                {responses.map((res, index) => (
                    <div key={index}>
                        <strong>You:</strong> {res.user}
                        <br />
                        <strong>Bot:</strong> {res.bot}
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
}

export default App;
