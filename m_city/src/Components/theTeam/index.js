import React, { useEffect, useState } from 'react';
import PlayerCard from '../Utils/PlayerCard';
import { Slide } from 'react-awesome-reveal';
import { Promise } from 'core-js';

import { showErrorToast } from '../Utils/tools';

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

  console.log(players);

  return <div>the team</div>;
};

export default TheTeam;
