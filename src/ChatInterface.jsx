import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';

function ChatInterface({ character, onBackToHome, uid, isNewChatbot = false }) {
  console.log("Character data:", character);
  console.log("Is new chatbot:", isNewChatbot);

  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);

  // 더미 데이터를 생성하는 함수 (기존 유지)
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

  // 채팅 기록을 가져오는 함수
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/chat/history/${uid}/${character.index}`);
        if (!response.ok) throw new Error(`Error fetching history: ${response.status}`);
        const data = await response.json();
        console.log("Fetched chat history:", data); // 디버깅 로그
        setChatHistory(data.map(chat => ({ sender: chat.sender, text: chat.message })));
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    // 새 챗봇이면 데이터베이스 연동을 생략
    if (!isNewChatbot && uid) fetchChatHistory();
  }, [uid, character.index, isNewChatbot]);

  // 채팅이 업데이트될 때 스크롤을 가장 아래로 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  // 메시지 전송 함수
  const handleSendMessage = async () => {
    if (message.trim() === '') return;
  
    setChatHistory((prev) => [...prev, { sender: 'user', text: message }]);
    setMessage('');
  
    try {
      if (isNewChatbot) {
        const response = await fetch('http://localhost:8080/api/newchatbot/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(message),
        });
  
        if (!response.ok) throw new Error(`Error: ${response.status}`);
  
        const botResponse = await response.text();
        setChatHistory((prev) => [...prev, { sender: 'bot', text: botResponse }]);
        return;
      }
  
      // 기존 챗봇 로직
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
      setChatHistory((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse = isNewChatbot
        ? 'The chatbot is currently unavailable. Please try again later.'
        : generateDummyResponse(character.index);
      setChatHistory((prev) => [...prev, { sender: 'bot', text: errorResponse }]);
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
        <h2>{isNewChatbot ? character.job : 'Chat History'}</h2> {/* 새 챗봇의 경우 직업 표시 */}
        <div className="chat-list">
          <div className="chat-avatar">
            {isNewChatbot ? (
              <span>{character.job}</span> // 새 챗봇은 직업만 표시
            ) : (
              <>
                <img src={character.image} alt={character.name} />
                <span>{character.name}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="chat-box">
        <div className="chat-header">
          {isNewChatbot ? (
            <span>{character.job}</span> // 새 챗봇은 직업만 표시
          ) : (
            <>
              <img src={character.image} alt={character.name} className="character-avatar" />
              <span>{character.name}</span>
            </>
          )}
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
