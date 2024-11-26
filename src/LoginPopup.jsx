import React, { useState } from 'react';
import './LoginPopup.css';
import GoogleLogin from './GoogleLogin';

function LoginPopup({ onClose, setUid }) {
  const [credentials, setCredentials] = useState({ id: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="login-popup" onClick={(e) => e.stopPropagation()}>
        <div style={{ width: 400, height: 300, position: 'relative' }}>
          <div
            style={{
              width: 400,
              height: 350,
              position: 'absolute',
              background: 'white',
              borderRadius: 25,
              border: '3px #D9D9D9 solid',
            }}
          />
          <div
            style={{
              width: 100,
              height: 40,
              position: 'absolute',
              textAlign: 'center',
              color: 'black',
              fontSize: 24,
              fontFamily: 'Judson',
              fontWeight: '400',
              top: 35,
              left: 'calc(50% - 50px)',
            }}
          >
            LOGIN
          </div>

          {/* ID 입력 필드 */}
          <input
            type="text"
            name="id"
            value={credentials.id}
            onChange={handleChange}
            placeholder="Please enter your ID"
            style={{
              width: 350,
              height: 40,
              position: 'absolute',
              top: 90,
              left: 25,
              padding: '10px',
              borderRadius: 15,
              border: '3px #D9D9D9 solid',
              fontSize: 16,
              fontFamily: 'Inter',
              boxSizing: 'border-box',
            }}
          />

          {/* Password 입력 필드 */}
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Please enter your password"
            style={{
              width: 350,
              height: 40,
              position: 'absolute',
              top: 140,
              left: 25,
              padding: '10px',
              borderRadius: 15,
              border: '3px #D9D9D9 solid',
              fontSize: 16,
              fontFamily: 'Inter',
              boxSizing: 'border-box',
            }}
          />

      <div
            style={{
              width: 350,
              height: 50,
              position: 'absolute',
              top: 210,
              left: 25,
              background: '#FFE486',
              borderRadius: '0 20px 20px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button onClick={onClose}>echo로 로그인</button>
          </div>

          {/* Google 로그인 버튼 */}
          <div
            style={{
              width: 350,
              height: 50,
              position: 'absolute',
              top: 270,
              left: 25,
              background: '#FFE486',
              borderRadius: '0 20px 20px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <GoogleLogin setUid={setUid} onClose={onClose} />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPopup;
