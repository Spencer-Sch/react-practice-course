import React from 'react';

import { CityLogo } from '../Utils/tools';

const Footer = () => {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CityLogo link={true} linkTo={'/'} width="70px" height="70px" />
      </div>
      <div className="gooter_descl">
        Manchest city 2022. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
