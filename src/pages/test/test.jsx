import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './test.css'

/**
 * 
 * @param {*} props 
 * initNum  初始值
 * changeNum  目标值，通过传入目标值触发动效
 * animationTime 动画时间
 * width 宽度
 * height 高度
 * className 最外层样式
 */

function Test(props) {
  const {initNum = '', changeNum, animationTime = '5', width = '50', height = '50',className} = props;
  const [rotateArr,setRotateArr] = useState([]);
  const [numArr,setNumArr] = useState(initNum.split(''));
  const loading = useRef(false)
  // useEffect(()=>{
  //   setNumArr(initNum.split(''));
  // },[initNum])

  const changeNumFunc = useCallback((tNum) => {
    if(loading.current) return;
    loading.current = true;
    const targetNum = tNum.split('');
    let isStop = true
    const roArr = numArr.map((item,index)=>{
      const touStart = +targetNum[index] > +item ? 9 - targetNum[index] : 0;
      const tou = 9 - +item;
      const wei = +targetNum[index] > +item ? 10 : 9 - targetNum[index];
      if(+targetNum[index]===+item && isStop) {
        return []
      } else {
        isStop = false;
      };// 同数字不转动
      const array = Array.from({ length: 10 }, (_, index) => 9 - index);
      const rearrangedArray = array.slice(wei,10).concat(array.slice(touStart ,tou));
      const ele = document.querySelector(`#num_${index}`);
      const lie = document.querySelector(`#lie_${index}`);
      lie.style.transform = `translateY(${-(ele.offsetHeight *rearrangedArray.length)}px)`
      setTimeout(() => {
        lie.style.transition = `all ${animationTime}s`;
        lie.style.transform =  `translateY(0px)`;
      }, 0);
      setTimeout(() => {
        lie.style.transition = 'none';
      }, animationTime * 1000);
      return rearrangedArray || []
    })
    setRotateArr(roArr)
    setTimeout(() => {
      setNumArr(tNum.split(''));
      setRotateArr([])
      loading.current = false;
    }, animationTime * 1000);
  },[numArr,animationTime])

  
  useEffect(()=>{
    if(changeNum && changeNum!==initNum) {
      changeNumFunc(changeNum)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[changeNum,initNum])


  const renderNum = useMemo(() => {
    return (
      numArr?.map((num,i)=>(
        <div className={`${styles.num} ${className}`} style={{width:`calc(${width} / 32 * 1rem)`,height:`calc(${height} / 32 * 1rem)`}} key={i} id={`num_${i}`}>
        <div id={`lie_${i}`} className={styles.lie}>
          {rotateArr[i]?.map((item,index)=>(
            <div style={{width:`calc(${width} / 32 * 1rem)`,height:`calc(${height} / 32 * 1rem)`}}className={styles.mapNum} key={index}>{item}</div>
          ))}
          <div style={{width:`calc(${width} / 32 * 1rem)`,height:`calc(${height} / 32 * 1rem)`}}className={styles.mapNum} >{num}</div>
        </div>
      </div>
      ))
    )
  },[numArr,rotateArr,className,width,height])
  return (
    <div className={styles.main}>
      {renderNum}
      <div onClick={()=>{changeNumFunc('49995')}}>按 钮</div>
    </div>
  )
}

export default Test;