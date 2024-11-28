import React, { useState } from "react";
import "./CreateProcess.css";

function CreateProcess({ onBackToHome, onComplete }) {
  const questions = [
    { id: 1, question: "What's your job?", options: ["student", "teacher", "police", "singer", "programmer", "sportsman", "unemployed", "other"] },
    { id: 2, question: "What's your age?", options: ["0-5", "5-10", "10-20", "20-30", "30-40", "40-50", "50-60", "other"] },
    { id: 3, question: "What's your hobby?", options: ["science", "dancing", "sports", "singing", "programming", "other"] },
    { id: 4, question: "What's your favorite food?", options: ["pizza", "sushi", "burger", "pasta", "salad", "steak", "tacos", "other"] },
    { id: 5, question: "What's your favorite color?", options: ["red", "blue", "green", "yellow", "purple", "black", "white", "other"] },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [customInputs, setCustomInputs] = useState({}); // `other` 입력 상태

  const handleOptionClick = (option) => {
    setSelectedOptions([...selectedOptions, option]);
    moveToNextQuestion();
  };

  const handleCustomInputChange = (e, questionId) => {
    setCustomInputs({ ...customInputs, [questionId]: e.target.value });
  };

  const handleCustomInputKeyDown = (e, questionId) => {
    if (e.key === "Enter") {
      handleCustomInputBlur(questionId);
    }
  };

  const handleCustomInputBlur = (questionId) => {
    const inputValue = customInputs[questionId]?.trim();
    if (inputValue) {
      setSelectedOptions([...selectedOptions, inputValue]);
      moveToNextQuestion();
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
      handleSubmit(); // 챗봇 생성 요청
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

  const handleSubmit = async () => {
    const chatbotConcept = {
      job: selectedOptions[0],
      age: selectedOptions[1],
      hobby: selectedOptions[2],
      favoriteFood: selectedOptions[3],
      favoriteColor: selectedOptions[4],
    };
  
    try {
      const response = await fetch("http://localhost:8080/api/newchatbot/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatbotConcept),
      });
  
      if (response.ok) {
        const message = await response.text();
        console.log(message);
        alert("Chatbot created! Proceeding to chat...");
  
        // 수정: 배열이 아닌 객체 형태로 전달
        onComplete({
          index: 999, // 고유 인덱스
          name: "Custom Chatbot",
          description: "A custom chatbot",
          job: chatbotConcept.job,
          isNewChatbot: true,
        });
      } else {
        console.error("Failed to create chatbot");
        alert("Failed to create chatbot. Please try again.");
      }
    } catch (error) {
      console.error("Error creating chatbot:", error);
      alert("Error occurred while creating chatbot.");
    }
  };

  return (
    <div className="create-process">
      <header className="header">
        <button onClick={handleBackClick} className="back-button">
          ←
        </button>
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
          <button className="go-to-chatting-button"
  onClick={() =>
    onComplete({
      index: 999,
      name: "Custom Chatbot",
      description: "A custom chatbot",
      job: selectedOptions[0], // 예: selectedOptions에서 job을 추출
      isNewChatbot: true,
    })
  }>
            Go to Chatting
          </button>
        </div>
      ) : (
        <div className="question-container">
          <h2>{questions[currentQuestion].question}</h2>
          <div className="options-grid">
            {questions[currentQuestion].options.map((option, index) =>
              option === "other" ? (
                <input
                  key={index}
                  type="text"
                  className="option-input-as-button"
                  placeholder="Other"
                  value={customInputs[questions[currentQuestion].id] || ""}
                  onChange={(e) => handleCustomInputChange(e, questions[currentQuestion].id)}
                  onKeyDown={(e) => handleCustomInputKeyDown(e, questions[currentQuestion].id)}
                  onBlur={() => handleCustomInputBlur(questions[currentQuestion].id)}
                />
              ) : (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              )
            )}
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
          <span>
            {currentQuestion + 1}/{questions.length}
          </span>
        </footer>
      )}
    </div>
  );
}

export default CreateProcess;
