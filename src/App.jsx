import React, { useState, useEffect } from 'react';
import HomePage from './HomePage.jsx';
import ChatInterface from './ChatInterface.jsx';
import CreateProcess from './CreateProcess.jsx';
import MyPage from './MyPage.jsx';

import black from './Avatars/black_guy.png';
import white from './Avatars/White_guy.png';
import mexican from './Avatars/Mexican_girl.png';
import asian from './Avatars/Asian_girl.png';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showHomePage, setShowHomePage] = useState(true);
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [showCreateProcess, setShowCreateProcess] = useState(false);
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [showMyPage, setShowMyPage] = useState(false);

  const characters = [
    { index: 0, name: 'Black Rapper', description: 'black friend', image: black },
    { index: 1, name: 'White IT Developer', description: 'white guy', image: white },
    { index: 2, name: 'Mexican American', description: 'hispanic girl', image: mexican },
    { index: 3, name: 'Asian American', description: 'Asian girl', image: asian },
  ];

  // 디버깅용 useEffect 추가
  useEffect(() => {
    console.log("selectedCharacter updated:", selectedCharacter);
  }, [selectedCharacter]);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setShowHomePage(false);
    setShowChatInterface(true);
  };

  const handleBackToHome = () => {
    setSelectedCharacter(null);
    setShowHomePage(true);
    setShowChatInterface(false);
    setShowCreateProcess(false);
    setShowMyPage(false);
  };

  const handleShowCreateProcess = () => {
    setShowHomePage(false);
    setShowChatInterface(false);
    setShowCreateProcess(true);
    setShowMyPage(false);
  };

  const handleShowMyPage = () => {
    setShowHomePage(false);
    setShowChatInterface(false);
    setShowCreateProcess(false);
    setShowMyPage(true);
  };

  const handleCreateProcessComplete = (newChatbotData) => {
    console.log("New chatbot data received:", newChatbotData);
    setSelectedCharacter(newChatbotData);
    console.log("Updated selectedCharacter:", newChatbotData);
    setShowCreateProcess(false);
    setShowChatInterface(true);
  };
  return (
    <div>
      {showHomePage && (
        <HomePage
          characters={characters}
          onCharacterSelect={handleCharacterSelect}
          onShowCreateProcess={handleShowCreateProcess}
          onShowMyPage={handleShowMyPage}
          setUid={setCurrentUserUid}
        />
      )}
      {showChatInterface && (
        <ChatInterface
          character={selectedCharacter}
          onBackToHome={handleBackToHome}
          uid={currentUserUid}
          isNewChatbot={selectedCharacter?.index === 999} // 새 챗봇 여부
        />
      )}
      {showCreateProcess && (
        <CreateProcess
          onBackToHome={handleBackToHome}
          onComplete={handleCreateProcessComplete} // 콜백 전달
        />
      )}
      {showMyPage && <MyPage onBackToHome={handleBackToHome} />}
    </div>
  );
}

export default App;
