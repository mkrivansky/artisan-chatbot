// src/components/MessageInput.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
    display: flex;
    margin-top: 20px;
    word-wrap: break-word
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #7d3afd;
    border-radius: 5px;
    word-wrap: break-word;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button`
    padding: 10px;
    margin-left: 10px;
    background-color: #7d3afd;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

    &:hover {
        opacity: 0.6;
    }
`;

const MessageInput: React.FC<{ onSend: (text: string) => void }> = ({ onSend }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText('');
        }
    };

    return (
        <InputContainer>
            <Input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
            />
            <Button onClick={handleSend}>Send</Button>
        </InputContainer>
    );
};

export default MessageInput;
