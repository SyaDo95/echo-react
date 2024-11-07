import React from 'react';
import './HomePage.css';
import { auth, provider, signInWithPopup } from './firebase';

function HomePage({ characters, onCharacterSelect, onShowCreateProcess }) {
  // Google 로그인 팝업 창을 띄워 회원가입 및 로그인 처리
  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google 로그인 성공:", user);
      // 로그인 또는 회원가입 성공 후 추가 로직을 여기서 수행 (예: 사용자 정보 저장, 리디렉션 등)
    } catch (error) {
      console.error("Google 로그인 오류:", error);
    }
  };

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
          <button className="sign-in" onClick={handleGoogleRegister}>Sign in</button>
          <button className="register" onClick={handleGoogleRegister}>Register</button>
        </div>
      </header>

      <nav className="menu">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
        <button onClick={handleScrollToCharacters}>Character</button>
        <button>Chatting</button>
        <button onClick={onShowCreateProcess}>Create</button>
        <button>My page</button>
      </nav>

      <section className="main-section">
        <div className="main-content">
          <h2>Echo</h2>
          <p>welcome</p>
        </div>
      </section>

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
