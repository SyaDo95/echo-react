import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';

function ChatInterface({ character, onBackToHome, uid }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/chat/history/${uid}`);
        const data = await response.json();
        setChatHistory(data.map(chat => ({ sender: chat.sender, text: chat.message })));
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    if (uid) fetchChatHistory(); // uid가 유효할 때만 호출
  }, [uid]);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    setChatHistory([...chatHistory, { sender: 'user', text: message }]);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: { uid },
          botIndex: character.index,
          message,
          sender: 'user',
        }),
      });
      const reply = await response.json();
      setChatHistory((prev) => [...prev, { sender: 'bot', text: reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory((prev) => [...prev, { sender: 'bot', text: 'Error: Unable to fetch response.' }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="chat-container">
      <div className="chat-history-container">
        <button className="back-button" onClick={onBackToHome}>←</button>
        <h2>Chat History</h2>
        <div className="chat-list">
          <div className="chat-avatar">
            <img src={character.image} alt={character.name} />
            <span>{character.name}</span>
          </div>
        </div>
      </div>
      <div className="chat-box">
        <div className="chat-header">
          <img src={character.image} alt={character.name} className="character-avatar" />
          <span>{character.name}</span>
        </div>
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.sender}`}>
              <p>{chat.text}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSendMessage} className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
