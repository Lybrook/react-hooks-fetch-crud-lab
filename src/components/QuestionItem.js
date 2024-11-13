import React, { useState, useEffect } from "react";

function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const [selectedCorrectIndex, setSelectedCorrectIndex] = useState(correctIndex);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleCorrectAnswerChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value, 10);
    setSelectedCorrectIndex(newCorrectIndex); 

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        console.log("Updated question:", updatedQuestion);
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  useEffect(() => {
    setSelectedCorrectIndex(correctIndex); 
  }, [correctIndex]);

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedCorrectIndex} onChange={handleCorrectAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
