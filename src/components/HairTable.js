/* eslint-disable no-console */
import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import Table from './Table';
// import PropTypes from 'prop-types';

function HairTable() {
  const setHairLossLevel = useStoreActions((actions) => actions.options.setHairLossLevel);

  // this will be the value of the slider
  const tmp = 0.4;
  setHairLossLevel(tmp);

  // Here we need a foreach active head zone
  const zoneMaxGrafts = useStoreState((state) => state.options.hairZones.zone1.maxGrafts);
  const zoneGrafts = tmp * zoneMaxGrafts;

  const factor = useStoreState((state) => state.options.factor);
  const hairs = zoneGrafts * factor;

  return (
    <Table
      columns={['Estimated # of', 'Grafts', 'Hairs']}
      data={[
        ['Zone 1', zoneGrafts, hairs],
      ]}
    />
  );
}

export default HairTable;
