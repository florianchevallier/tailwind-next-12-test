import intervalToDuration from "date-fns/intervalToDuration";
import React, { useEffect, useState } from "react";
import { useInterval } from "../../utils/hooks/useInterval";

interface ITimeLeftProps {
  endDate: number;
  labels: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }
}

function formatDate(value?: number) {
  if (value) {
    if (value < 10) return `0${value}`;
    if (value === 0) return "00";
    return value;
  }
  return "00";
}

function getInitialDuration(endTs: number) {
  const start = new Date();
  const end = new Date(endTs);
  return intervalToDuration({ start, end });
}

export default function TimeLeft({ endDate, labels }: ITimeLeftProps) {
  const [duration, setDuration] = useState<Duration>(
    getInitialDuration(endDate)
  );
  const end = new Date(endDate);

  useInterval(() => {
    const newDuration = intervalToDuration({ start: new Date(), end });
    setDuration(() => newDuration);
  }, 1000);

  if (duration) {
    return (
      <div className="flex shadow-md items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <div className="flex w-full items-center justify-between">
          <div className="flex-col gap-y-7 items-center justify-center">
            <div className="text-xs text-center">{labels.days}</div>
            <div className="text-2xl text-center">{formatDate(duration.days)}</div>
          </div>
          <div className="flex-col gap-y-7 items-center justify-center">
            <div className="text-xs text-center">{labels.hours}</div>
            <div className="text-2xl text-center">{formatDate(duration.hours)}</div>
          </div>
          <div className="flex-col gap-y-7 items-center justify-center">
            <div className="text-xs text-center">{labels.minutes}</div>
            <div className="text-2xl text-center">{formatDate(duration.minutes)}</div>
          </div>
          <div className="flex-col gap-y-7 items-center justify-center">
            <div className="text-xs text-center">{labels.seconds}</div>
            <div className="text-2xl text-center">{formatDate(duration.seconds)}</div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
