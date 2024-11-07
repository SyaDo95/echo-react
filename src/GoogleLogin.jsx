import React from 'react';
import { auth, provider, signInWithPopup } from './firebase';

function GoogleLogin() {
  // Google 로그인 함수
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // 백엔드로 ID 토큰 전송하여 인증
      const response = await fetch('/auth/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(idToken),
      });

      const data = await response.text();
      console.log("서버 응답:", data);

      // 로그인 성공 후 필요한 로직 추가 (예: 리디렉션 등)
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Google로 로그인
    </button>
  );
}

export default GoogleLogin;
