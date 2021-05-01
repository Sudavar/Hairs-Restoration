/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useStoreState, useStoreActions } from 'easy-peasy';
import i18n from '../i18n';

import Wrapper from '../components/Wrapper';
import Panel from '../components/Panel';

import HairList from '../components/HairList';
import Head from '../components/Head';
import Slider from '../components/Slider';

const useStyles = createUseStyles({
  headPanels: {
    display: 'grid',
    gridTemplate: `
      'rear'
      'top'
      'back'
    `,
    justifyItems: 'center',
    alignItems: 'center',
    gap: '14px',
    marginTop: '2em',
    width: '100%',
    maxWidth: '1000px',
    boxSizing: 'border-box',
  },
  '@media screen and (min-width: 480px)': {
    headPanels: {
      gridTemplate: `
        'rear top'
        'back .'
      `,
    },
  },
  '@media screen and (min-width: 900px)': {
    headPanels: {
      gridTemplate: `
        'rear top back'
      `,
    },
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '20px',
    marginTop: '2em',
  },
  header: {
    textAlign: 'center',
  },
  logoContainer: {
    width: '100%',
    maxWidth: '240px',
  },
  logo: {
    width: '100%',
  },
  '@media screen and (min-width: 700px)': {
    headerWrapper: {
      flexDirection: 'row',
    },
  },
  title: {
    color: ({ theme }) => theme.colors.dark,
    fontWeight: ({ theme }) => theme.fontWeights.regular,
    fontSize: '2.6em',
    margin: 0,
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
  languages: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '200px',
    margin: '0 auto',
  },
  language: {
    color: ({ theme }) => theme.colors.primary,
    fontWeight: ({ theme }) => theme.fontWeights.bold,
    letterSpacing: '0.1rem',
    cursor: 'pointer',
  },
});

function Main() {
  const theme = useTheme();
  const classes = useStyles({ theme });

  // We use `language` to force the component to re-render on language switch
  // eslint-disable-next-line no-unused-vars
  const [language, setLanguage] = useState(i18n.getLanguage());

  const hairLossLevel = useStoreState((state) => state.options.hairLossLevel);
  const setHairLossLevel = useStoreActions((actions) => actions.options.setHairLossLevel);

  const languages = ['en', 'el'];

  /**
   * Switch the language to the given language
   *
   * @param {string} lang
   */
  const switchLanguage = (lang) => {
    i18n.setLanguage(lang);
    setLanguage(lang);
  };

  return (
    <Wrapper>
      <div className={classes.headerWrapper}>
        <div className={classes.logoContainer}>
          <img src="logo.jpg" alt="DHI Global Medical Group" className={classes.logo} />
        </div>

        <div className={classes.header}>
          <h1 className={classes.title}>
            {i18n.title}
          </h1>
          <p className={classes.subtitle}>
            {i18n.subtitle}
          </p>
          <div className={classes.languages}>
            {languages.map((lang) => (
              <span
                key={lang}
                className={classes.language}
                onClick={() => switchLanguage(lang)}
                role="button"
              >
                {i18n[lang]}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={classes.headPanels}>
        <Panel style={{ gridArea: 'rear' }}>
          <Head side="rear" />
        </Panel>

        <Panel style={{ gridArea: 'top' }}>
          <Head side="top" />
        </Panel>

        <Panel style={{ gridArea: 'back' }}>
          <Head side="back" />
        </Panel>
      </div>

      <Panel
        style={{
          width: '100%',
          maxWidth: '1000px',
          padding: '40px',
          background: theme.colors.light,
          borderRadius: 45,
          boxSizing: 'border-box',
          marginTop: '14px',
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
    </Wrapper>
  );
}

export default Main;
