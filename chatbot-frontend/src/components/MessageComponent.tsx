import React, { useState } from 'react';
import Message from './Message';

type MessageItem = {
   sender: string;
   initialMessage: string;
   id: number;
 }

type MessageComponentProps = {
  messages: MessageItem[];
}

const MessageComponent = (props: MessageComponentProps) => {
  const [messages, setMessages] = useState(props.messages);
  
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender}`}>
          {/* <span className="sender">{message.sender}:</span>
          <span className="text">{message.text}</span> */}
          <Message initialMessage={message.initialMessage} sender={message.sender} id={message.id} />
          {message.sender === 'user' && 
            <span>
               <button>Delete</button><button>Edit</button>
            </span>}
        </div>
      ))}
    </div>
  );
};

export default MessageComponent;