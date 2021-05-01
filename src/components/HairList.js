import React, { useCallback } from 'react';
import { useStoreState } from 'easy-peasy';
import { createUseStyles, useTheme } from 'react-jss';
import { motion } from 'framer-motion';

import i18n from '../i18n';

const useStyles = createUseStyles({
  list: {
    fontSize: '1em',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    fontWeight: ({ theme }) => theme.fontWeights.bold,
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 9999,
    padding: '0.8em 0.6em',
    marginBottom: '0.4em',
    '&:first-child': {
      marginTop: '0.4em',
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  column: {
    width: '100%',
    margin: 0,
  },
  zoneName: {
    backgroundColor: '#000000',
    borderRadius: '9999px',
    color: '#ffffff',
    padding: '0.25em 0.8em',
  },
});

function HairList() {
  const { hairLossLevel, factor, hairZones } = useStoreState((state) => state.options);

  const theme = useTheme();
  const classes = useStyles({ theme });

  const getZoneColor = useCallback((zoneId, alpha = 1) => {
    const { h, s, l } = theme.colors.zones[zoneId] || theme.colors.zones.default;
    return `hsla(${h}, ${s}, ${l}, ${alpha})`;
  }, []);

  const zoneNames = {
    zone1: i18n.zone1,
    zone2: i18n.zone2,
    zone3: i18n.zone3,
    zone4: i18n.zone4,
    zone5: i18n.zone5,
    zone6: i18n.zone6,
    zone7: i18n.zone7,
  };

  const data = hairZones
    .filter(({ active }) => active)
    .map(({ id, maxGrafts }) => {
      const grafts = Math.round(maxGrafts * hairLossLevel);
      const hairs = Math.round(grafts * factor);

      return {
        id,
        name: zoneNames[id],
        grafts,
        hairs,
      };
    });

  const sumGrafts = data.reduce((acc, cur) => acc + cur.grafts, 0);
  const sumHairs = data.reduce((acc, cur) => acc + cur.hairs, 0);

  const renderListItem = (item) => {
    const listItemColor = item.listItemColor || 'transparent';
    const zoneNameColor = item.zoneNameColor || 'transparent';

    return (
      <motion.li
        key={item.id}
        className={classes.listItem}
        style={{
          backgroundColor: listItemColor,
          color: '#000',
        }}
        layoutId={item.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { duration: 0.4 },
        }}
      >
        <p className={classes.column}>
          <span
            className={classes.zoneName}
            style={{ backgroundColor: zoneNameColor }}
          >
            {item.name}
          </span>
        </p>
        <p className={classes.column}>{item.grafts}</p>
        <p className={classes.column}>{item.hairs}</p>
      </motion.li>
    );
  };

  return (
    <ul className={classes.list}>
      {data.length > 0 ? (
        renderListItem({
          id: 'headers',
          listItemColor: 'transparent',
          zoneNameColor: 'transparent',
          name: '',
          grafts: i18n.grafts,
          hairs: i18n.hairs,
        })
      ) : null}

      {data.map((item) => renderListItem({
        ...item,
        listItemColor: getZoneColor(item.id, 0.2),
        zoneNameColor: getZoneColor(item.id),
      }))}

      {data.length > 0 ? (
        renderListItem({
          id: 'sum',
          listItemColor: '#e6e6e6',
          zoneNameColor: '#000',
          name: i18n.total,
          grafts: sumGrafts,
          hairs: sumHairs,
        })
      ) : null}
    </ul>
  );
}

export default HairList;
