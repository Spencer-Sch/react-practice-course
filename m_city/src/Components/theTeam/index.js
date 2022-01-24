import React, { useEffect, useState } from 'react';
import PlayerCard from '../Utils/PlayerCard';
import { Slide } from 'react-awesome-reveal';
import { Promise } from 'core-js';

import { showErrorToast } from '../Utils/tools';
import { CircularProgress } from '@material-ui/core';

import { firebase, playersCollection } from '../../firebase';
import { getDocs, query } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const storage = getStorage();

const TheTeam = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    if (!players) {
      const q = query(playersCollection);
      getDocs(q)
        .then((snapshot) => {
          const players = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          let promises = [];

          players.forEach((player, index) => {
            promises.push(
              new Promise((resolve, reject) => {
                const imgRef = ref(storage, `players/${player.image}`);
                getDownloadURL(imgRef)
                  .then((url) => {
                    players[index].url = url;
                    resolve();
                  })
                  .catch((error) => {
                    reject();
                  });
              })
            );
          });

          Promise.all(promises).then(() => {
            setPlayers(players);
          });
        })
        .catch((error) => {
          showErrorToast('Sorry, try again later');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [players]);

  const showPlayerByCategory = (category) =>
    players
      ? players.map((player) => {
          return player.position === category ? (
            <Slide left key={player.id} triggerOnce>
              <div className="item">
                <PlayerCard
                  number={player.number}
                  firstName={player.firstName}
                  lastName={player.lastName}
                  bck={player.url}
                />
              </div>
            </Slide>
          ) : null;
        })
      : null;

  return (
    <div className="the_team_container">
      {loading ? (
        <div className="progress">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className="team_category_wrapper">
            <div className="title">Keepers</div>
            <div className="team_cards">{showPlayerByCategory('Keeper')}</div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Defence</div>
            <div className="team_cards">{showPlayerByCategory('Defence')}</div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Midfield</div>
            <div className="team_cards">{showPlayerByCategory('Midfield')}</div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Strikers</div>
            <div className="team_cards">{showPlayerByCategory('Striker')}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheTeam;
