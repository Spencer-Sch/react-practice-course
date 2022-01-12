import React, { useState, useEffect } from 'react';
import { Slide } from 'react-awesome-reveal';
import { matchesCollection } from '../../../firebase';
import { getDocs } from 'firebase/firestore';
import MatchesBlock from '../../Utils/Matches_block';

const Blocks = () => {
  const [matches, setMatches] = useState([]);

  const fetchData = async () => {
    return await getDocs(matchesCollection);
  };

  useEffect(() => {
    if (!matches.length > 0) {
      fetchData()
        .then((snapshot) => {
          const matches = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMatches(matches);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [matches]);

  const showMatches = (matches) =>
    matches
      ? matches.map((match) => (
          <Slide bottom key={match.id} className="item" triggerOnce>
            <div>
              <div className="wrapper">
                <MatchesBlock match={match} />
              </div>
            </div>
          </Slide>
        ))
      : null;

  return <div className="home_matches">{showMatches(matches)}</div>;
};

export default Blocks;
