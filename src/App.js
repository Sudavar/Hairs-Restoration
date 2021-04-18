import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { ThemeProvider } from 'react-jss';

import store from './store';
import HairTable from './components/HairTable';

const theme = {
  colorPrimary: '#282c34',
  colorText: '#ffffff',
};

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <h2>Graft Hair Calculator</h2>

          <div className="panel left">
            <HairTable />
            {/* <Slider /> */}
          </div>
          <div className="panel right">
            {/* <HeadDisplay /> */}
          </div>
        </div>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
