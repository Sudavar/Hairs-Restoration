/* eslint-disable no-param-reassign */
import { action, computed } from 'easy-peasy';

const optionsModel = {
  hairLossLevel: 0,
  setHairLossLevel: action((state, payload) => {
    state.hairLossLevel = payload;
  }),

  factor: computed((state) => {
    const maxFactor = 4;
    const middleFactor = 2.3;

    if (state.hairLossLevel <= 0.5) {
      return middleFactor;
    }

    const offset = maxFactor - middleFactor;
    const increase = ((state.hairLossLevel - 0.5) * offset) / 0.5;

    return middleFactor + increase;
  }),

  maxGrafts: {
    zone1: 495,
    zone2: 990,
    zone3: 1575,
    zone4: 1170,
    zone5: 1395,
    zone6: 1170,
    zone7: 1080,
  },
};

export default optionsModel;
