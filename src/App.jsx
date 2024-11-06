import React, { useState } from 'react';
import HomePage from './HomePage.jsx';
import ChatInterface from './ChatInterface.jsx';
import CreateProcess from './CreateProcess.jsx';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showHomePage, setShowHomePage] = useState(true);
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [showCreateProcess, setShowCreateProcess] = useState(false);

  const characters = [
    { index: 0, name: 'Black Rapper', description: 'Yo! Let"s rap together!', image: 'path/to/black_rapper_image' },
    { index: 1, name: 'White IT Developer', description: '...', image: 'path/to/white_it_developer_image' },
    { index: 2, name: 'Asian American', description: '...', image: 'path/to/asian_american_image' },
    { index: 3, name: 'Woman aspiring to become an announcer', description: '...', image: 'path/to/announcer_image' }
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
        />
      )}
      {showChatInterface && (
        <ChatInterface
          character={selectedCharacter}
          onBackToHome={handleBackToHome}
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