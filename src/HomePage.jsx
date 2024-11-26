import React, { useState } from 'react';
import './HomePage.css';
import { auth, provider, signInWithPopup } from './firebase'; // firebase.js에서 필요한 모듈 가져오기
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup'; // RegisterPopup 임포트 추가

function HomePage({ characters, onCharacterSelect, onShowCreateProcess, onShowMyPage, setUid }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false); // RegisterPopup 상태 추가

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    setShowRegisterPopup(false); // 팝업 닫을 때 RegisterPopup도 닫기
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // Firebase 인증
      const idToken = await result.user.getIdToken(); // Firebase ID Token 가져오기
      console.log('Firebase ID Token:', idToken); // 콘솔에 출력
      const uid = result.user.uid; // 사용자 UID 가져오기
      console.log('Logged in UID:', uid);
      setUid(uid); // 부모 컴포넌트로 UID 전달
    } catch (error) {
      console.error('Login Error:', error); // 오류 처리
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
          <button className="sign-in" onClick={openPopup}>
            Sign in
          </button>
          <button className="register" onClick={() => setShowRegisterPopup(true)}>
            Register
          </button>
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
      {isPopupOpen && <LoginPopup onClose={closePopup} setUid={setUid} />}
      {showRegisterPopup && <RegisterPopup onClose={closePopup} />} {/* RegisterPopup 추가 */}
    </div>
  );
}



export default HomePage;