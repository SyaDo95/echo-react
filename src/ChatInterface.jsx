import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';

function ChatInterface({ character, onBackToHome }) {
  const [chatHistory, setChatHistory] = useState([
    { sender: 'character', text: "Hey! What's up?" },
    { sender: 'user', text: "Hi! Recommend a lunch menu!!" },
    { sender: 'character', text: "oh! Then how about tteokbokki?" }
  ]);
  const [message, setMessage] = useState('');

  // Ref for the chat history container to scroll
  const chatEndRef = useRef(null);

  // Automatically scroll to the bottom when chatHistory updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // 메시지 전송 핸들러
  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    setChatHistory([...chatHistory, { sender: 'user', text: message }]);
    setMessage('');  // 메시지 전송 후 입력 필드를 초기화

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botIndex: character.index, userMessage: message })
      });
      const data = await response.json();
      setChatHistory((prev) => [
        ...prev,
        { sender: 'character', text: data.reply }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory((prev) => [
        ...prev,
        { sender: 'character', text: 'Error: Unable to get a response from the server.' }
      ]);
    }
  };

  // Enter 키로 메시지 전송
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
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
          <div className="add-button">+</div>
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
          {/* This empty div will always be scrolled into view */}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}  // Enter 키 이벤트 핸들러
          />
          <button onClick={handleSendMessage} className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
