import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';

import i18n from '../i18n';

import Panel from '../components/Panel';
import HairList from '../components/HairList';
import Head from '../components/Head';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
  },
  panels: {
    display: 'grid',
    gridTemplate: `
      'rear'
      'top'
      'back'
      'list'
    `,
    justifyItems: 'center',
    alignItems: 'center',
    gap: '14px',
    width: 'calc(100% - 20px)',
    maxWidth: '1000px',
    marginTop: '2em',
  },
  '@media screen and (min-width: 480px)': {
    panels: {
      gridTemplate: `
        'rear top'
        'back .'
        'list list'
      `,
    },
  },
  '@media screen and (min-width: 900px)': {
    panels: {
      gridTemplate: `
        'rear top back'
        'list list list'
      `,
    },
  },
  header: {
    textAlign: 'center',
  },
  title: {
    color: ({ theme }) => theme.colors.dark,
    fontWeight: ({ theme }) => theme.fontWeights.regular,
    fontSize: '2.4em',
    marginBottom: 0,
  },
  subtitle: {
    color: ({ theme }) => theme.colors.primary,
    fontWeight: ({ theme }) => theme.fontWeights.bold,
    fontSize: '1em',
  },
});

function Main() {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h1 className={classes.title}>
          {i18n.title}
        </h1>
        <p className={classes.subtitle}>
          {i18n.subtitle}
        </p>
      </div>

      <div className={classes.panels}>
        <Panel style={{ gridArea: 'rear' }}>
          <Head side="rear" />
        </Panel>

        <Panel style={{ gridArea: 'top' }}>
          <Head side="top" />
        </Panel>

        <Panel style={{ gridArea: 'back' }}>
          <Head side="back" />
        </Panel>

        <Panel style={{ gridArea: 'list' }}>
          <HairList />
        </Panel>
      </div>
    </div>
  );
}

export default Main;
