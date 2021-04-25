import React, { useCallback } from 'react';
import { useStoreState } from 'easy-peasy';
import { createUseStyles, useTheme } from 'react-jss';

const useStyles = createUseStyles({
  list: {
    fontSize: '1em',
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    borderRadius: 9999,
    padding: '0.25em 1em',
    marginBottom: '0.4em',
    '&:last-child': {
      marginBottom: 0,
    },
  },
});

function HairList() {
  const { hairLossLevel, factor, hairZones } = useStoreState((state) => state.options);

  const theme = useTheme();
  const classes = useStyles({ theme });

  const getZoneColor = useCallback((zoneId) => (
    theme.colors.zones[zoneId] || theme.colors.zones.default
  ), []);

  const data = hairZones
    .filter(({ active }) => active)
    .map(({ id, name, maxGrafts }) => {
      const grafts = Math.round(maxGrafts * hairLossLevel);
      const hairs = Math.round(grafts * factor);

      return {
        id,
        name,
        grafts,
        hairs,
      };
    });

  return (
    <ul className={classes.list}>
      {data.map((item) => (
        <li
          key={item.id}
          className={classes.listItem}
          style={{ backgroundColor: getZoneColor(item.id) }}
        >
          <span>{item.name}</span>
          <span>{item.grafts}</span>
          <span>{item.hairs}</span>
        </li>
      ))}
    </ul>
  );
}

export default HairList;
