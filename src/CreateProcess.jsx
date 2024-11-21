import React, { useState } from 'react';
import './CreateProcess.css';

function CreateProcess({ onBackToHome, onComplete }) {
  const questions = [
    { id: 1, question: "What's your job?", options: ["student", "teacher", "police", "singer", "programmer", "sportsman", "unemployed", "other"] },
    { id: 2, question: "What's your age?", options: ["0-5", "5-10", "10-20", "20-30", "30-40", "40-50", "50-60", "other"] },
    { id: 3, question: "What's your hobby?", options: ["science", "dancing", "sports", "singing", "programming", "other"] },
    { id: 4, question: "What's your favorite food?", options: ["pizza", "sushi", "burger", "pasta", "salad", "steak", "tacos"] },
    { id: 5, question: "What's your favorite color?", options: ["red", "blue", "green", "yellow", "purple", "black", "white"] },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOptions([...selectedOptions, option]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true); // 마지막 질문 이후 완료 화면으로 전환
    }
  };

  const handleBackClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOptions(selectedOptions.slice(0, -1)); // 이전 선택 제거
    } else {
      onBackToHome();
    }
  };

  const handleGoToChatting = () => {
    onComplete(selectedOptions); // 선택된 옵션을 전달하며 ChatInterface로 전환
  };

  return (
    <div className="create-process">
      <header className="header">
        <button onClick={handleBackClick} className="back-button">←</button>
        <h1>Create your friend</h1>
      </header>

      {isComplete ? (
        <div className="completion-screen">
          <h2>Create success!</h2>
          <p>Your selections:</p>
          <div className="selections">
            {selectedOptions.map((option, index) => (
              <span key={index} className="selection-item">{option}</span>
            ))}
          </div>
          <button className="go-to-chatting-button" onClick={handleGoToChatting}>
            Go to Chatting
          </button>
        </div>
      ) : (
        <div className="question-container">
          <h2>{questions[currentQuestion].question}</h2>
          <div className="options-grid">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {!isComplete && (
        <footer className="progress-footer">
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <span>{currentQuestion + 1}/{questions.length}</span>
        </footer>
      )}
    </div>
  );
}

export default CreateProcess;