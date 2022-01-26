import React, { useEffect } from 'react';
import Featured from './Featured';
import MatchesHome from './Matches';
import MeetPlayers from './MeetPlayers';
import Promotion from './Promotion';

const Home = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="bck_blue">
      <Featured />
      <MatchesHome />
      <MeetPlayers />
      <Promotion />
    </div>
  );
};

export default Home;
