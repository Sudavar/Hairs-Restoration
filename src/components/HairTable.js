import React from 'react';
import { useStoreState } from 'easy-peasy';

import Table from './Table';

function HairTable() {
  const { hairLossLevel, factor, hairZones } = useStoreState((state) => state.options);

  const data = hairZones
    .filter(({ active }) => active)
    .map(({ name, maxGrafts }) => {
      const grafts = Math.round(maxGrafts * hairLossLevel);
      const hairs = Math.round(grafts * factor);

      return [name, grafts, hairs];
    });

  return (
    <Table
      columns={['Estimated # of', 'Grafts', 'Hairs']}
      data={data}
    />
  );
}

export default HairTable;
