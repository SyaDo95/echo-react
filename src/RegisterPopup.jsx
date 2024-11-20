import React, { useState } from 'react';

function RegisterPopup({ onClose }) {
  const [selectedGender, setSelectedGender] = useState(null); // 성별 선택 상태

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <>
      {/* 어두운 배경 오버레이 */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 100,
      }} onClick={onClose}></div>

      {/* 회원가입 팝업 */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 413,
        height: 469,
        background: 'white',
        borderRadius: 25,
        border: '2px #D9D9D9 solid',
        zIndex: 101,
        padding: 20,
        boxSizing: 'border-box',
      }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* 제목 */}
          <div style={{
            textAlign: 'center',
            color: 'black',
            fontSize: 24,
            fontFamily: 'Judson',
            fontWeight: '400',
            marginBottom: 20,
          }}>REGISTER</div>

          {/* 입력 필드 */}
          {['ID', 'PASSWORD', 'NAME', 'BIRTH'].map((label, index) => (
            <div key={index} style={{
              marginBottom: 15,
            }}>
              <input
                type={label === 'PASSWORD' ? 'password' : 'text'}
                placeholder={label}
                style={{
                  width: '100%',
                  height: 40,
                  padding: '10px',
                  borderRadius: 15,
                  border: '2px #D9D9D9 solid',
                  fontSize: 14,
                  boxSizing: 'border-box',
                  fontFamily: 'Inter',
                }}
              />
            </div>
          ))}

          {/* 성별 선택 */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: 40,
            borderRadius: 15,
            border: '2px #D9D9D9 solid',
            display: 'flex',
            marginTop: 15,
            overflow: 'hidden',
          }}>
            {/* 남자 */}
            <div
              onClick={() => handleGenderSelect('BOY')}
              style={{
                flex: 1,
                textAlign: 'center',
                lineHeight: '40px',
                fontSize: 14,
                fontFamily: 'Inter',
                color: selectedGender === 'BOY' ? 'white' : '#757575',
                background: selectedGender === 'BOY' ? '#FFE486' : 'white',
                cursor: 'pointer',
              }}
            >
              BOY
            </div>
            {/* 구분선 */}
            <div style={{
              width: 2,
              background: '#D9D9D9',
            }}></div>
            {/* 여자 */}
            <div
              onClick={() => handleGenderSelect('GIRL')}
              style={{
                flex: 1,
                textAlign: 'center',
                lineHeight: '40px',
                fontSize: 14,
                fontFamily: 'Inter',
                color: selectedGender === 'GIRL' ? 'white' : '#757575',
                background: selectedGender === 'GIRL' ? '#FFE486' : 'white',
                cursor: 'pointer',
              }}
            >
              GIRL
            </div>
          </div>

          {/* 등록 버튼 */}
          <div style={{
            marginTop: 30,
            textAlign: 'center',
          }}>
            <button style={{
              width: '100%',
              height: 50,
              background: '#FFE486',
              borderRadius: 30,
              border: 'none',
              fontSize: 18,
              fontWeight: 'bold',
              cursor: 'pointer',
            }} onClick={onClose}>REGISTER</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPopup;
