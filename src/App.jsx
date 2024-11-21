import React, { useState } from 'react';
import HomePage from './HomePage.jsx';
import ChatInterface from './ChatInterface.jsx';
import CreateProcess from './CreateProcess.jsx';
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

  const characters = [
    { index: 0, name: 'Black Rapper', description: 'black friend', image: black },
    { index: 1, name: 'White IT Developer', description: 'white guy', image: white },
    { index: 2, name: 'Maxican American', description: 'hispanic girl', image: mexican },
    { index: 3, name: 'Asian American', description: 'Asian girl', image: asian }
  ];

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
  };

  const handleShowCreateProcess = () => {
    setShowHomePage(false);
    setShowChatInterface(false);
    setShowCreateProcess(true);
  };

  return (
    <div>
      {showHomePage && (
        <HomePage
          characters={characters}
          onCharacterSelect={handleCharacterSelect}
          onShowCreateProcess={handleShowCreateProcess}
          setUid={setCurrentUserUid} // UID를 설정할 핸들러 전달
        />
      )}
      {showChatInterface && (
        <ChatInterface
          character={selectedCharacter}
          onBackToHome={handleBackToHome}
          uid={currentUserUid} // UID 전달
        />
      )}
      {showCreateProcess && (
        <CreateProcess
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
}

export default App;
