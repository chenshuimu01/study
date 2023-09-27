import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd-mobile'
import styles from './index.css'

import trueIcon from '../../images/trueIcon.png'
import falseIcon from '../../images/falseIcon.png'

function Index() {
  const numberOfQuestions = 50; // 问题数量
  const numberMax = 100; // 生成的随机数最大值
  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState(new Array(numberOfQuestions).fill(''));

  // 生成随机的问题和答案
  const generateRandomNumbers = (isScroll) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 使用平滑滚动效果
    });
    const newQuestions = Array.from({ length: numberOfQuestions }, () => {
      const num1 = Math.floor(Math.random() * numberMax) + 1; // 生成 1 到 numberMax 的随机数
      const num2 = Math.floor(Math.random() * numberMax) + 1;
      const isSubtraction = Math.random() < 0.5; // 是否为减法
      // 数字1比数字2小且为减法的时候需要对调两个数字
      const [larger, smaller] = num1 < num2 && isSubtraction ? [num2, num1] : [num1, num2];
      const correctAnswer = isSubtraction ? larger - smaller : larger + smaller;
      const quesText = isSubtraction ? `${larger} - ${smaller} = ` : `${larger} + ${smaller} = `;
      
      return { question: quesText, answer: correctAnswer };
    });
    setQuestions(newQuestions);
    setSubmitted(false);
    setUserAnswers(new Array(numberOfQuestions).fill(''));
  };
  
  useEffect(() => {
    // 在组件加载时生成随机问题
    generateRandomNumbers()
  }, [])

  const handleSubmit = () => {
    // 计算每个问题的结果并判断得分
    const newResults = questions.map((item, index) => {
      const userAnswer = parseInt(userAnswers[index], 10);
      return userAnswer === item.answer;
    });

    // 计算正确答案的数量
    const count = newResults.filter(item => item === true).length;
    let contentText;
    // 根据得分弹出不同的提示
    if(count < questions.length * 0.6) {
      contentText = '不及格哦，继续努力';
    } else if(count === questions.length) {
      contentText = '太棒啦，你获得了满分！';
    } else {
      contentText = `恭喜你获得${count}分，继续加油吧`;
    }

    Modal.alert({
      content: (
        <div style={{textAlign: 'center'}}>
          {contentText}
        </div>
      ),
      closeOnMaskClick: true,
    })

    // 更新结果状态
    setSubmitted(true);
  };

  const handleUserAnswerChange = (index, value) => {
    if(value > 999) return; // 限制最大值999
    // 处理用户输入的答案
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  return (
    <div className={styles.main}>
      <h1>小学一年级加法试卷</h1>
      {questions.map((item, index) => (
        <div key={index}>
          <div className={styles.question}>
            <div>{item?.question}</div>
            {!submitted && (
              <input
                className={styles.answerInput}
                type="number"
                value={userAnswers[index]}
                onChange={(e) => handleUserAnswerChange(index, e.target.value)}
              />
            )}
            {submitted && (
              <div className={styles.answerText}>
                答案：{item.answer}
              </div>
            )}
          </div>
          { submitted && (
            <div className={styles.youAnswer} style={{color: parseInt(userAnswers[index]) === item.answer ? '#2bb66d' : '#da2a2a'}}>
              你的答案：{userAnswers[index]}
              <img src={parseInt(userAnswers[index]) === item.answer ? trueIcon : falseIcon} alt="" />
            </div>
          )}
        </div>
      ))}
      <br />
      {!submitted ? <Button color='success' fill='solid' className={styles.submitBtn} onClick={handleSubmit}>提交答案</Button>
      : <Button className={styles.submitBtn}color='warning' onClick={()=>{generateRandomNumbers(true)}}>重新生成试卷</Button>}
    </div>
  );
}

export default Index;
