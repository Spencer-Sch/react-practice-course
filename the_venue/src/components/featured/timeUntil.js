import React, { useState, useEffect, useCallback } from 'react';
import { Slide } from 'react-awesome-reveal';

const getEventDate = () => {
  const eventDate = new Date(`Jan, 20, ${new Date().getFullYear()}, 01:20:00`);

  const currentMonth = new Date().getMonth();

  eventDate.setMonth(currentMonth === 11 ? 0 : currentMonth + 1);

  return eventDate;
};

const TimeUntil = () => {
  const [time, setTime] = useState({
    days: '0',
    hours: '0',
    minutes: '0',
    seconds: '0',
  });

  const renderItem = (time, value) => (
    <div className="countdown_item">
      <div className="countdown_time">{time}</div>
      <div className="tag">{value}</div>
    </div>
  );

  const getTimeUntil = useCallback((deadline) => {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      console.log('time has passed');
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));

      setTime({
        days,
        hours,
        minutes,
        seconds,
      });
    }
  }, []);

  useEffect(() => {
    setInterval(() => getTimeUntil(getEventDate()), 1000);
  }, [getTimeUntil]);

  return (
    <Slide left delay={1000}>
      <div className="countdown_wrapper">
        <div className="countdown_top">Event starts in</div>
        <div className="countdown_bottom">
          {renderItem(time.days, 'Days')}
          {renderItem(time.hours, 'Hrs')}
          {renderItem(time.minutes, 'Mins')}
          {renderItem(time.seconds, 'Secs')}
        </div>
      </div>
    </Slide>
  );
};

export default TimeUntil;
