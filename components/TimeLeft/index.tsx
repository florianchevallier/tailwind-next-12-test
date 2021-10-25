import intervalToDuration from "date-fns/intervalToDuration";
import React, { useEffect, useState } from "react";

interface ITimeLeftProps {
  endDate: number;
}

function formatDate(value?: number) {
  if (value) {
    if (value < 10) return `0${value}`;
    if (value === 0) return '00'
    return value;
  }
  return '00';
}

function getDurationString(duration: Duration) {
  console.log('duration', duration);
  let string = "Plus que ";
  string += `${formatDate(duration.days)} jours `;
  string += `${formatDate(duration.hours)}h`;
  string += `${formatDate(duration.minutes)}m`;
  string += `${formatDate(duration.seconds)}sec`;
  return `${string} pour en profiter !`;
}

export default function TimeLeft({ endDate }: ITimeLeftProps) {
  const [duration, setDuration] = useState<Duration>();

  useEffect(() => {
    let i = 0;
    const start = new Date();
    const interval = setInterval(() => {
      const end = new Date(endDate - i);
      const newDuration = intervalToDuration({ start, end });
      setDuration(() => newDuration);
      i += 1000;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (duration) {
    return <p>{getDurationString(duration)}</p>
  }
  return null
}
