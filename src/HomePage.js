import React from 'react';
import './HomePage.css';

function HomePage({ characters, onCharacterSelect }) {
  const handleScrollToCharacters = () => {
    document.getElementById('characterSection').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      <div className="menu">
        <button onClick={handleScrollToCharacters}>Character</button>
        <button>Chatting</button>
        <button>Share</button>
        <button>My page</button>
      </div>

      <div id="characterSection" className="character-section">
        <h2>Character</h2>
        <p>Choose your mate!</p>
        <div className="character-list">
          {characters.map((character, index) => (
            <div
              key={index}
              className="character-card"
              onClick={() => onCharacterSelect(character)}
            >
              <img src={character.image} alt={character.name} />
              <h3>{character.name}</h3>
              <p>{character.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
