import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useStoreState, useStoreActions } from 'easy-peasy';
import i18n from '../i18n';

import Panel from '../components/Panel';
import HairList from '../components/HairList';
import Head from '../components/Head';
import Slider from '../components/Slider';

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
  sliderWrapper: {
    position: 'relative',
  },
  sliderLegend: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'calc(100% - 4.8em)',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: ({ theme }) => theme.fontWeights.bold,
    fontSize: '0.6em',
    letterSpacing: '0.2rem',
    textTransform: 'uppercase',
    padding: '0 2.4em',
    mixBlendMode: 'difference',
    pointerEvents: 'none',
    color: '#fff',
    userSelect: 'none',
  },
  '@media screen and (max-width: 800px)': {
    sliderLegend: {
      display: 'none',
    },
  },
});

function Main() {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const hairLossLevel = useStoreState((state) => state.options.hairLossLevel);
  const setHairLossLevel = useStoreActions((actions) => actions.options.setHairLossLevel);

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

        <Panel
          style={{
            gridArea: 'list',
            width: 'calc(100% - 80px)',
            padding: '40px',
          }}
        >
          <div className={classes.sliderWrapper}>
            <Slider
              steps={45}
              onChange={setHairLossLevel}
              initialValue={hairLossLevel}
            />
            <div className={classes.sliderLegend}>
              <span>{i18n.totallyBald}</span>
              <span>{i18n.appearanceOfHairReestablished}</span>
              <span>{i18n.appearanceOfFullness}</span>
            </div>
          </div>
          <HairList />
        </Panel>
      </div>
    </div>
  );
}

export default Main;
