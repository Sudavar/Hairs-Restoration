import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from 'react-jss';
import { useStoreState, useStoreActions } from 'easy-peasy';

import HeadBack from './HeadBack';
import HeadRear from './HeadRear';
import HeadTop from './HeadTop';

function Head({ side }) {
  const theme = useTheme();

  const hairZones = useStoreState((state) => state.options.hairZones);
  const toggleHairZone = useStoreActions((actions) => actions.options.toggleHairZone);

  const getZoneColor = (zoneId, alpha = 1) => {
    const { active } = hairZones.find((item) => item.id === zoneId);

    if (!active) {
      return theme.colors.unselectedZone;
    }

    const { h, s, l } = theme.colors.zones[zoneId] || theme.colors.zones.default;
    return `hsla(${h}, ${s}, ${l}, ${alpha})`;
  };

  const svgComponentMap = {
    back: HeadBack,
    rear: HeadRear,
    top: HeadTop,
  };

  const HeadComponent = svgComponentMap[side];

  return (
    <HeadComponent
      toggleZone={toggleHairZone}
      getZoneColor={getZoneColor}
    />
  );
}

Head.propTypes = {
  side: PropTypes.oneOf(['back', 'rear', 'top']).isRequired,
};

export default Head;
