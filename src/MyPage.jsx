import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth'; // Firebase Authentication 가져오기
import './MyPage.css';

function MyPage({ onBackToHome }) {
  const [userData, setUserData] = useState({
    name: 'Unknown',
    email: 'No email',
    age: 'Not provided',
    statusMessage: 'No status message',
  });

  // Firebase에서 사용자 정보 가져오기
  useEffect(() => {
    const auth = getAuth(); // Firebase Auth 인스턴스 가져오기
    const currentUser = auth.currentUser;

    if (currentUser) {
      // 사용자 정보가 있다면 상태 업데이트
      setUserData({
        name: currentUser.displayName || 'Unknown',
        email: currentUser.email || 'No email',
        age: 'Not provided', // 필요 시 추가로 가져올 수 있음
        statusMessage: 'No status message', // 필요 시 사용자 정의 데이터베이스 사용
      });
    }
  }, []);

  return (
    <div className="my-page">
      {/* Header */}
      <header className="my-page-header">
        <button className="back-button" onClick={onBackToHome}>⬅</button>
        <h1>MY PAGE</h1>
      </header>

      {/* Main Content */}
      <div className="my-page-container">
        {/* Left Section: Avatar & Basic Info */}
        <div className="left-section">
          <div className="avatar-box">
            <img
              src="https://via.placeholder.com/150" // Placeholder 이미지 (사용자 프로필 이미지 추가 가능)
              alt="User Avatar"
              className="avatar"
            />
          </div>
          <div className="basic-info">
            <h2>{userData.name}</h2>
            <p>{userData.age}</p>
            <p>{userData.statusMessage}</p>
          </div>
        </div>

        {/* Right Section: Profile Details */}
        <div className="right-section">
          <h3 className="profile-title">PROFILE</h3>
          <div className="profile-item">
            <span>🧑 NAME</span>
            <button>NAME CORRECTION</button>
          </div>
          <div className="profile-item">
            <span>🆔 ID</span>
            <p>{userData.name}</p>
          </div>
          <div className="profile-item">
            <span>📧 E-MAIL</span>
            <p>{userData.email}</p>
          </div>
          <div className="profile-item">
            <span>🔒 PASSWORD</span>
            <button>CORRECTION</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
