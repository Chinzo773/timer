'use client'

import { useEffect, useState } from "react";

const Page = () => {
  const [time, setTime] = useState(0);
  const [downTime, setDownTime] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (isTimerActive) {
      timerInterval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isTimerActive]);

  useEffect(() => {
    let countdownInterval;

    if (isCountdownActive) {
      countdownInterval = setInterval(() => {
        setDownTime(prevDownTime => {
          if (prevDownTime > 0) {
            return prevDownTime - 1;
          } else {
            clearInterval(countdownInterval);
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [isCountdownActive]);

  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const remainingSeconds = String(time % 60).padStart(2, '0');

  return (
    <div>
      <div>
        <h2>Timer</h2>
        <p>Elapsed Time: {minutes}:{remainingSeconds}</p>
        <button onClick={() => setIsTimerActive(true)}>Start Timer</button>
        <button onClick={() => setIsTimerActive(false)}>Stop Timer</button>
      </div>

      <div>
        <h2>Countdown</h2>
        <p>Countdown: {downTime} seconds</p>
        <button onClick={() => setIsCountdownActive(true)}>Start Countdown</button>
        <button onClick={() => setIsCountdownActive(false)}>Stop Countdown</button>
      </div>
    </div>
  );
};

export default Page;
