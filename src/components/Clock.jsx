import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return date.toLocaleString('id-ID', options);
  };

  return (
    <div className="text-center mx-0 flex items-center h-full">
      <p className="text-xs md:text-base font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">{formatDate(time)}</p>
    </div>
  );
};

export default Clock;
