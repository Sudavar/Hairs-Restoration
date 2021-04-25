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
      default: 'hsl(231deg 100% 68%)',
      zone1: 'hsl(231deg 100% 68%)',
      zone2: 'hsl(183deg 87% 53%)',
      zone3: 'hsl(45deg 96% 58%)',
      zone4: 'hsl(33deg 100% 50%)',
      zone5: 'hsl(126deg 100% 47%)',
      zone6: 'hsl(287deg 100% 64%)',
      zone7: 'hsl(351deg 100% 62%)',
    },
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
