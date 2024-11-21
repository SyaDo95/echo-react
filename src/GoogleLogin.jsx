import React, { useState } from 'react';
import { auth, provider, signInWithPopup } from './firebase';

function GoogleLogin({ setUid }) {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // 백엔드로 ID 토큰 전송하여 인증
      const response = await fetch('http://localhost:8080/auth/verifyToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(idToken),
      });

      const uid = await response.text();
      console.log("Authenticated UID:", uid);

      setUid(uid); // UID를 상위 컴포넌트로 전달
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <button onClick={handleGoogleSignIn}>Sign in with Google</button>
  );
}

export default GoogleLogin;
