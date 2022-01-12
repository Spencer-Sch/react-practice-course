import React from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

import Otamendy from '../../../Resources/images/players/Otamendy.png';
import Sterling from '../../../Resources/images/players/Raheem_Sterling_col.png';
import Kompany from '../../../Resources/images/players/Vincent_Kompany_col.png';
import Mendy from '../../../Resources/images/players/Benjamin_Mendy.png';
import PlayerCard from '../../Utils/PlayerCard';

let cards = [
  {
    bottom: 90,
    left: 300,
    player: Mendy,
    number: '22',
    firstName: 'Benjamin',
    lastName: 'Mendy',
  },
  {
    bottom: 60,
    left: 200,
    player: Sterling,
    number: '07',
    firstName: 'Raheem',
    lastName: 'Sterling',
  },
  {
    bottom: 30,
    left: 100,
    player: Otamendy,
    number: '30',
    firstName: 'Raheem',
    lastName: 'Otamendy',
  },
  {
    bottom: 0,
    left: 0,
    player: Kompany,
    number: '04',
    firstName: 'Vincent',
    lastName: 'Kompany',
  },
];

const HomeCards = (props) => {
  const showAnimateCards = () =>
    cards.map((card, i) => (
      <Animate
        key={i}
        show={props.show}
        start={{
          left: 0,
          bottom: 0,
        }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: {
            delay: 500,
            duration: 500,
            ease: easePolyOut,
          },
        }}
      >
        {({ left, bottom }) => (
          <div
            style={{
              position: 'absolute',
              left,
              bottom,
            }}
          >
            <PlayerCard
              number={card.number}
              firstName={card.firstName}
              lastName={card.lastName}
              bck={card.player}
            />
          </div>
        )}
      </Animate>
    ));

  return <div>{showAnimateCards()}</div>;
};

export default HomeCards;
