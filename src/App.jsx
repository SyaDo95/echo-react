import React, { useState } from 'react';
import HomePage from './HomePage.jsx';
import ChatInterface from './ChatInterface.jsx';
import CreateProcess from './CreateProcess.jsx';
import MyPage from './MyPage.jsx'; // MyPage 컴포넌트를 import

import black from './Avatars/black_guy.png';
import white from './Avatars/White_guy.png';
import mexican from './Avatars/Mexican_girl.png';
import asian from './Avatars/Asian_girl.png';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showHomePage, setShowHomePage] = useState(true);
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [showCreateProcess, setShowCreateProcess] = useState(false);
  const [showMyPage, setShowMyPage] = useState(false); // MyPage 상태 추가

  const characters = [
    { index: 0, name: 'Black Rapper', description: 'black friend', image: black },
    { index: 1, name: 'White IT Developer', description: 'white guy', image: white },
    { index: 2, name: 'Mexican American', description: 'hispanic girl', image: mexican },
    { index: 3, name: 'Asian American', description: 'Asian girl', image: asian }
  ];

  // 캐릭터 선택 핸들러
  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setShowHomePage(false);
    setShowChatInterface(true);
  };

  // Home으로 돌아가는 핸들러
  const handleBackToHome = () => {
    setSelectedCharacter(null);
    setShowHomePage(true);
    setShowChatInterface(false);
    setShowCreateProcess(false);
    setShowMyPage(false); // MyPage 상태도 해제
  };

  // CreateProcess 화면으로 전환
  const handleShowCreateProcess = () => {
    setShowHomePage(false);
    setShowChatInterface(false);
    setShowCreateProcess(true);
    setShowMyPage(false); // 다른 페이지 상태 해제
  };

  // MyPage 화면으로 전환
  const handleShowMyPage = () => {
    setShowHomePage(false);
    setShowChatInterface(false);
    setShowCreateProcess(false);
    setShowMyPage(true); // MyPage 활성화
  };

  return (
    <div>
      {showHomePage && (
        <HomePage
          characters={characters}
          onCharacterSelect={handleCharacterSelect}
          onShowCreateProcess={handleShowCreateProcess}
          onShowMyPage={handleShowMyPage} // MyPage 핸들러 전달
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
      {showMyPage && ( // MyPage 컴포넌트 렌더링
        <MyPage onBackToHome={handleBackToHome} />
      )}
    </div>
  );
}

export default App;
