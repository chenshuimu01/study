import React, { useEffect, useState } from 'react';
import styles from './index.css' // 导入样式文件

import trueIcon from '../../images/trueIcon.png'
import falseIcon from '../../images/falseIcon.png'

function Index() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState(new Array(50).fill(''));
  const [results, setResults] = useState(new Array(50).fill(null));

  // 生成随机的问题和答案
  const generateRandomNumbers = () => {
    const numberOfQuestions = 50; // 修改为您希望生成的问题数量
    const newQuestions = [];
    const newAnswers = [];

    for (let i = 0; i < numberOfQuestions; i++) {
      let num1 = Math.floor(Math.random() * 100) + 1; // 生成 1 到 100 的随机数
      let num2 = Math.floor(Math.random() * 100) + 1;
      if (num1 < num2) {
        // 如果num1小于num2，交换它们的值
        const temp = num1;
        num1 = num2;
        num2 = temp;
      }
      let correctAnswer = num1 + num2;
      let quesText = `${num1} + ${num2} = `
      if(Math.random() < 0.5) {
        correctAnswer = num1 - num2;
        quesText = `${num1} - ${num2} = `
      }
      
      newQuestions.push(quesText);
      newAnswers.push(correctAnswer);
    }

    setQuestions(newQuestions);
    setAnswers(newAnswers);
    setSubmitted(false);
    setUserAnswers(new Array(numberOfQuestions).fill(''));
    setResults(new Array(numberOfQuestions).fill(null));
  };
  
  useEffect(() => {
    // 在组件加载时生成随机问题
    generateRandomNumbers()
  }, [])

  const handleSubmit = () => {
    // 计算每个问题的结果并判断得分
    const newResults = answers.map((correctAnswer, index) => {
      const userAnswer = parseInt(userAnswers[index], 10);
      return userAnswer === correctAnswer;
    });

    console.log(newResults,'newResults');

    // 计算正确答案的数量
    const count = newResults.filter(item => item === true).length;
    console.log(count);

    // 根据得分弹出不同的提示
    if(count < count.length * 0.6) {
      alert('不及格哦，继续努力');
    } else if(count === count.length) {
      alert('太棒啦，你获得了满分！');
    } else {
      alert(`恭喜你获得${count}分，继续加油吧`);
    }

    // 更新结果状态
    setResults(newResults);
    setSubmitted(true);
  };

  const handleUserAnswerChange = (index, value) => {
    // 处理用户输入的答案
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
          <div className={styles.question}>
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
              </div>
            )}
          </div>
          { submitted && (
            <div style={{display: 'flex', color: results[index] ? '#2bb66d' : '#da2a2a'}}>
              你的答案：{userAnswers[index]}
              <img style={{width:'calc(40 / 32 * 1rem)'}} src={results[index]  ? trueIcon : falseIcon} alt="" />
            </div>
          )}
        </div>
      ))}
      <br />
      {!submitted && (
        <button className={styles.submitBtn} onClick={handleSubmit}>提交答案</button>
      )}
    </div>
  );
}

export default Index;
