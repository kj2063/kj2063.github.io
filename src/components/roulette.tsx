import React, { useState } from 'react';
import '@src/styles/roulette.css';

const Roulette = () => {
  const items = [
    '학습 및 포스팅',
    '코딩테스트 문제풀이',
    '개인 프로젝트 진행',
    '블로그 확장 개발',
  ];
  const itemsRepeatCnt = 5;
  const itemHeight = 60; // 개별 아이템 높이 - css도 맞춰줘야 함
  const [position, setPosition] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  let totalItems : string[] = [];

  for (let i = 0; i < itemsRepeatCnt; i += 1) {
    totalItems = totalItems.concat(items);
  }

  const spinRoulette = () => {
    if (isSpinning) return;

    /* css - transition 제거 */
    const itemsElement : any = document.querySelector('.roulette-items');
    if (itemsElement) {
      itemsElement.style.transition = 'none';
      setPosition(0);
    }

    setIsSpinning(true);

    const finalIndex = (itemsRepeatCnt - 1) * items.length + Math.floor(Math.random() * items.length);
    const finalPosition = -(finalIndex * itemHeight);

    setTimeout(() => {
      if (itemsElement) {
        itemsElement.style.transition = 'transform 1s ease-out';
        setPosition(finalPosition);
      }

      setIsSpinning(false);
    }, 0);
  };

  return (
    <div className="roulette-container">
      <div className="roulette-title">
        <h3>✏️ 오늘의 개발공부</h3>
      </div>
      <div className="roulette-content">
        <div className="roulette">
          <div className="roulette-items" style={{ transform: `translateY(${position}px)`, transition: 'transform 1s ease-out' }}>
            {totalItems.map((item, index) => (
              <div key={index} className="roulette-item">{item}</div>
            ))}
          </div>
        </div>
        <button type="button" className="roulette-button" onClick={spinRoulette} disabled={isSpinning}>
          {isSpinning ? 'Spinning...' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default Roulette;
