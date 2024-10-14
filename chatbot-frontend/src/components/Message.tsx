import React, { useState } from 'react';

type MessageProps = {
  initialMessage: string;
  sender: string;
  id: number;
}

const Message = (props: MessageProps) => {
  const [message, setMessage] = useState(props.initialMessage);
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSaveClick = () => {
    // Perform any necessary actions to save the edited message
    console.log("Saving edited message:", message);
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <div>
          <input type="text" value={message} onChange={handleInputChange} />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <p>{message}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Message;