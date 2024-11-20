import React, { useState } from 'react';
import './HomePage.css';
import { auth, provider, signInWithPopup } from './firebase';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup'; // RegisterPopup 임포트 추가

function HomePage({ characters, onCharacterSelect, onShowCreateProcess, onShowMyPage }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false); // RegisterPopup 상태 추가

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    setShowRegisterPopup(false); // 팝업 닫을 때 RegisterPopup도 닫기
  };

  // Google 로그인 팝업 창을 띄워 회원가입 및 로그인 처리
  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google 로그인 성공:", user);
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
          <button className="sign-in" onClick={openPopup}>Sign in</button>
          <button className="register" onClick={() => setShowRegisterPopup(true)}>Register</button> {/* 수정됨 */}
        </div>
      </header>

      <nav className="menu">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
        <button onClick={handleScrollToCharacters}>Character</button>
        <button onClick={onShowCreateProcess}>Create</button>
        <button onClick={onShowMyPage}>My Page</button>
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

      {isPopupOpen && <LoginPopup onClose={closePopup} />} {/* 로그인 팝업 추가 */}
      {showRegisterPopup && <RegisterPopup onClose={closePopup} />} {/* RegisterPopup 추가 */}
    </div>
  );
}

export default HomePage;