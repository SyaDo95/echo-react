import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';

function ChatInterface({ character, onBackToHome, uid }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);

  // 더미 데이터를 생성하는 함수
  const generateDummyResponse = (botIndex) => {
    switch (botIndex) {
      case 0:
        return "Hello! I'm the black guy who loves rap and basketball!";
      case 1:
        return "Hi there! I'm the white guy who enjoys programming and Overwatch2.";
      case 2:
        return "Hola! I'm a Hispanic woman who dreams of being a sports reporter!";
      case 3:
        return "Hey! I'm an Asian American who loves K-pop and anime!";
      default:
        return "Hi! I'm just a simple chatbot.";
    }
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/chat/history/${uid}/${character.index}`);
        if (!response.ok) throw new Error(`Error fetching history: ${response.status}`);
        const data = await response.json();
        setChatHistory(data.map(chat => ({ sender: chat.sender, text: chat.message })));
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };
  
    if (uid) fetchChatHistory();
  }, [uid, character.index]);
  

  // 채팅이 업데이트될 때 스크롤을 가장 아래로 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    setChatHistory((prev) => [...prev, { sender: 'user', text: message }]);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/chat/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid,
          botIndex: character.index,
          message,
          sender: 'user',
        }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setChatHistory((prev) => [...prev, { sender: 'bot', text: data.reply }]); // 서버 응답 처리
    } catch (error) {
      console.error('Error sending message:', error);

      // 더미 데이터를 표시
      const dummyResponse = generateDummyResponse(character.index);
      setChatHistory((prev) => [...prev, { sender: 'bot', text: dummyResponse }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="chat-container">
      <div className="chat-history-container">
        <button className="back-button" onClick={onBackToHome}>
          ←
        </button>
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
          <button onClick={handleSendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
