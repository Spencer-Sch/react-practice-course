import React, { useState, useEffect } from 'react';
import { Fade, Slide } from 'react-awesome-reveal';

const Discount = () => {
  const end = 30;

  const [start, setStart] = useState(0);

  const percentage = () => {
    if (start < end) {
      setStart((prevCount) => prevCount + 1);
    }
  };

  useEffect(() => {
    if (start > 0 && start < 30) {
      setTimeout(() => {
        setStart((prevCount) => prevCount + 1);
      }, 30);
    }
  }, [start]);

  return (
    <div className="center_wrapper">
      <div className="discount_wrapper">
        <Fade
          onVisibilityChange={(inView) => {
            if (inView) {
              percentage();
            }
          }}
        >
          <div className="discount_percentage">
            <span>{start}%</span>
            <span>OFF</span>
          </div>
        </Fade>

        <Slide right={true}>
          <div className="discount_description">
            <h3>Purchase tickets before 20th June</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default Discount;
