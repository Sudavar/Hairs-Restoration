import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';

import i18n from '../i18n';

import Panel from '../components/Panel';
import HairList from '../components/HairList';
import Head from '../components/Head';

const useStyles = createUseStyles({
  panels: {
    display: 'grid',
  },
  header: {
    textAlign: 'center',
  },
  title: {
    color: ({ theme }) => theme.colors.dark,
  },
  subtitle: {
    color: ({ theme }) => theme.colors.dark,
  },
});

function Main() {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <>
      <div className={classes.header}>
        <h1 className={classes.title}>
          {i18n.title}
        </h1>
        <p className={classes.subtitle}>
          {i18n.subtitle}
        </p>
      </div>

      <div className={classes.panels}>
        <Panel>
          <Head side="back" />
        </Panel>

        <Panel>
          <Head side="rear" />
        </Panel>

        <Panel>
          <Head side="top" />
        </Panel>

        <Panel>
          <HairList />
        </Panel>
      </div>
    </>
  );
}

export default Main;
