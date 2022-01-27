import React, { useEffect } from 'react';
import { Tag } from '../../Utils/tools';
import Blocks from './Blocks';

const MatchesHome = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="home_matches_wrapper">
      <div className="container">
        <Tag bck="#0e1731" size="50px" color="#fff">
          Matches
        </Tag>
        <Blocks />
        <Tag size="22px" color="#0e1731" link={true} linkTo="/the_matches">
          Matches
        </Tag>
      </div>
    </div>
  );
};

export default MatchesHome;
