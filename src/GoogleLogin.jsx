import React, { useState } from 'react';
import { auth, provider, signInWithPopup } from './firebase';

function GoogleLogin({ setUid, onClose }) {
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

  return (
    <button onClick={() => {
      handleGoogleSignIn();
      onClose();
    }}>Google로 로그인</button>
  );
}

export default GoogleLogin;