import { createStore } from 'easy-peasy';

import options from './models/options';

const storeModel = {
  options,
};

export default createStore(storeModel);
