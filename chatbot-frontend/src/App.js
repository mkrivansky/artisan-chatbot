import React, { useState } from "react";
import axios from "axios";

function App() {
    const [message, setMessage] = useState("");
    const [responses, setResponses] = useState([]);

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:8000/chat', { message: message });
        setResponses([...responses, { user: message, bot: response.data.response }]);
        setMessage("");
        console.log(response.data);
      } catch (error) {
        console.log(error);
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
