import React, { useState, useEffect } from "react";
import "./Count.css";

const Count: React.FC = () => {
  const [graduationDate, setGraduationDate] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const handleGraduationDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGraduationDate(e.target.value);
  };

  const calculateRemainingTime = () => {
    if (!graduationDate) {
      return "Please enter your graduation date.";
    }

    const now = new Date();
    const graduationDay = new Date(graduationDate);
    const timeDiff = graduationDay.getTime() - now.getTime();

    if (timeDiff <= 0) {
      setRemainingTime(null);
      return "Graduation date has passed.";
    }

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    setRemainingTime({
      days: days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
    });
  };

  useEffect(() => {
    calculateRemainingTime();

    const intervalId = setInterval(() => {
      calculateRemainingTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [graduationDate]);

  return (
    <div>
      <input
        type="datetime-local"
        value={graduationDate}
        onChange={handleGraduationDateChange}
      />
      {remainingTime !== null && (
        <h1>
          Remaining Time: {remainingTime.days} days, {remainingTime.hours}{" "}
          hours, {remainingTime.minutes} minutes, {remainingTime.seconds}{" "}
          seconds
        </h1>
      )}
    </div>
  );
};

export default Count;
