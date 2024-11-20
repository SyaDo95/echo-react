import React from 'react';
import './MyPage.css';

function MyPage({ onBackToHome }) {
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
              src="https://via.placeholder.com/150" // Placeholder 이미지 (캐릭터 이미지 추가 가능)
              alt="User Avatar"
              className="avatar"
            />
          </div>
          <div className="basic-info">
            <h2>NAME</h2>
            <p>AGE</p>
            <p>status message</p>
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
            <button>CORRECTION</button>
          </div>
          <div className="profile-item">
            <span>📧 E-MAIL</span>
            <button>CORRECTION</button>
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
