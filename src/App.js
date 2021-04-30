import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { ThemeProvider } from 'react-jss';

import store from './store';

import Main from './routes/Main';

const theme = {
  colors: {
    primary: '#282c34',
    light: '#ffffff',
    intermediate: '#e6e6e6',
    dark: '#000000',
    zones: {
      default: { h: '231deg', s: '100%', l: '68%' },
      zone1: { h: '231deg', s: '100%', l: '68%' },
      zone2: { h: '183deg', s: '87%', l: '53%' },
      zone3: { h: '45deg', s: '96%', l: '58%' },
      zone4: { h: '33deg', s: '100%', l: '50%' },
      zone5: { h: '126deg', s: '100%', l: '47%' },
      zone6: { h: '287deg', s: '100%', l: '64%' },
      zone7: { h: '351deg', s: '100%', l: '62%' },
    },
  },
  fontWeights: {
    regular: 400,
    bold: 600,
  },
};

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
