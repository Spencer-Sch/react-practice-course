import React, { useState, useEffect } from 'react';
import { Slide } from 'react-awesome-reveal';
import { matchesCollection } from '../../../firebase';
import { getDocs } from 'firebase/firestore';

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
          console.log(matches);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [matches]);

  return <div>hello</div>;
};

export default Blocks;
