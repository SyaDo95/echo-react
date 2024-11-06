import React, { useState } from 'react';
import './ChatInterface.css';

function ChatInterface({ character, onBackToHome }) {
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = (message) => {
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);
    // Simulate a reply from character
    setChatHistory((prev) => [
      ...prev,
      { sender: 'character', text: `Reply to: ${message}` }
    ]);
  };

  return (
    <div className="chat-interface">
      <button onClick={onBackToHome}>+</button>
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.sender}`}>
            <p>{chat.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type your message" />
        <button onClick={() => handleSendMessage("Sample message")}>Send</button>
      </div>
    </div>
  );
}

export default ChatInterface;
