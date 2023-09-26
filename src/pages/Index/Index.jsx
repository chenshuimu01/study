import React, { useEffect, useState } from 'react';
import styles from './index.css'

// const trueIcon = require('../../images/trueIcon.png')
// const falseIcon = require('../images/falseIcon.png')
// import trueIcon from '../../images/trueIcon.png'
// import falseIcon from '../../images/falseIcon.png'
function Index() {
  console.log(styles);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState(new Array(10).fill(''));
  const [results, setResults] = useState(new Array(10).fill(null));
  const generateRandomNumbers = () => {
    const numberOfQuestions = 10; // 修改为您希望生成的问题数量
    const newQuestions = [];
    const newAnswers = [];

    for (let i = 0; i < numberOfQuestions; i++) {
      const num1 = Math.floor(Math.random() * 100) + 1; // 生成 1 到 10 的随机数
      const num2 = Math.floor(Math.random() * 100) + 1;
      const correctAnswer = num1 + num2;

      newQuestions.push(`${num1} + ${num2} = `);
      newAnswers.push(correctAnswer);
    }

    setQuestions(newQuestions);
    setAnswers(newAnswers);
    setSubmitted(false);
    setUserAnswers(new Array(numberOfQuestions).fill(''));
    setResults(new Array(numberOfQuestions).fill(null));
  };
  
  
  useEffect(()=>{
    generateRandomNumbers()
  },[])
  

  const handleSubmit = () => {
    const newResults = answers.map((correctAnswer, index) => {
      const userAnswer = parseInt(userAnswers[index], 10);
      return userAnswer === correctAnswer;
    });

    setResults(newResults);
    setSubmitted(true);
  };

  const handleUserAnswerChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };
  return (
    <div className={styles.main}>
      <h1>小学一年级加法试卷</h1>
      <button onClick={generateRandomNumbers}>生成试卷</button>
      <br />
      {questions.map((question, index) => (
        <div key={index}>
          <div>{question}</div>
          {!submitted && (
            <input
              type="number"
              value={userAnswers[index]}
              onChange={(e) => handleUserAnswerChange(index, e.target.value)}
            />
          )}
          {submitted && (
            <div>
              答案：{answers[index]}
              {/* <img style={{width:'calc(40 / 32 * 1rem)'}} src={results[index]  ? trueIcon : falseIcon} alt="" /> */}
            </div>
          )}
        </div>
      ))}
      <br />
      {!submitted && (
        <button onClick={handleSubmit}>提交答案</button>
      )}
    </div>
  );
}

export default Index;
