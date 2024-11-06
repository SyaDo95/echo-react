import React from 'react';
import './HomePage.css';

function HomePage({ characters, onCharacterSelect, onShowCreateProcess }) {
  const handleScrollToCharacters = () => {
    document.getElementById('characterSection').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="title">
          <h1>Echo</h1>
          <p>welcome</p>
        </div>
        <div className="auth-buttons">
          <button className="sign-in">Sign in</button>
          <button className="register">Register</button>
        </div>
      </header>

      <nav className="menu">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
        <button onClick={handleScrollToCharacters}>Character</button>
        <button>Chatting</button>
        <button onClick={onShowCreateProcess}>Create</button> {/* Create 버튼 클릭 시 onShowCreateProcess 호출 */}
        <button>My page</button>
      </nav>

      {/* 메인 섹션 */}
      <section className="main-section">
        <div className="main-content">
          <h2>Echo</h2>
          <p>welcome</p>
        </div>
      </section>

      {/* Character 섹션 */}
      <section id="characterSection" className="character-section">
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
      </section>
    </div>
  );
}

export default HomePage;
