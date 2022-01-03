import React from 'react';
import { Fade } from 'react-awesome-reveal';

const Footer = () => {
  return (
    <footer className="bck_red">
      <Fade triggerOnce delay={500}>
        <div className="font_righteous footer_logo_venue">The Venue</div>
        <div className="footer_copyright">
          The Venue 2021 all rights reserved
        </div>
      </Fade>
    </footer>
  );
};

export default Footer;
