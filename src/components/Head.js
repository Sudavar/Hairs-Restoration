import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as HeadBack } from '../assets/back.svg';
import { ReactComponent as HeadRear } from '../assets/rear.svg';
import { ReactComponent as HeadTop } from '../assets/top.svg';

function Head({ side }) {
  const svgComponentMap = {
    back: HeadBack,
    rear: HeadRear,
    top: HeadTop,
  };

  const HeadComponent = svgComponentMap[side];

  return (
    <HeadComponent />
  );
}

Head.propTypes = {
  side: PropTypes.oneOf(['back', 'rear', 'top']).isRequired,
};

export default Head;
