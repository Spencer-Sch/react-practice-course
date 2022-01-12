import React from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

import Otamendi from '../../../Resources/images/players/Otamendi.png';
import Sterling from '../../../Resources/images/players/Raheem_Sterling_col.png';
import Kompany from '../../../Resources/images/players/Vincent_Kompany_col.png';

let cards = [
  {
    bottom: 90,
    left: 300,
    player: Kompany,
  },
  {
    bottom: 60,
    left: 200,
    player: Sterling,
  },
  {
    bottom: 0,
    left: 0,
    player: Otamendi,
  },
  {
    bottom: 90,
    left: 300,
    player: Kompany,
  },
];

const HomeCards = (props) => {
  const showAnimateCards = () => cards.map((card, i) => <Animate></Animate>);

  return <div>{showAnimateCards()}</div>;
};

export default HomeCards;
