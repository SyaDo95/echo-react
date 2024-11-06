import React, { useState } from 'react';
import HomePage from './HomePage';
import ChatInterface from './ChatInterface';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showHomePage, setShowHomePage] = useState(true);

  const characters = [
    { name: 'Black Rapper', description: '...', image: 'path/to/black_rapper_image' },
    { name: 'White IT Developer', description: '...', image: 'path/to/white_it_developer_image' },
    { name: 'Asian American', description: '...', image: 'path/to/asian_american_image' },
    { name: 'Woman aspiring to become an announcer', description: '...', image: 'path/to/announcer_image' }
  ];

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setShowHomePage(false);
  };

  const handleBackToHome = () => {
    setSelectedCharacter(null);
    setShowHomePage(true);
  };

  return (
    <div>
      {showHomePage ? (
        <HomePage characters={characters} onCharacterSelect={handleCharacterSelect} />
      ) : (
        <ChatInterface character={selectedCharacter} onBackToHome={handleBackToHome} />
      )}
    </div>
  );
}

export default App;
