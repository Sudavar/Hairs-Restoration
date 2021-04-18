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

  hairZones: {
    zone1: {
      maxGrafts: 495,
      active: 0,
    },
    zone2: {
      maxGrafts: 990,
      active: 0,
    },
    zone3: {
      maxGrafts: 1575,
      active: 0,
    },
    zone4: {
      maxGrafts: 1170,
      active: 0,
    },
    zone5: {
      maxGrafts: 1395,
      active: 0,
    },
    zone6: {
      maxGrafts: 1170,
      active: 0,
    },
    zone7: {
      maxGrafts: 1080,
      active: 0,
    },
  },
  setHairZoneActive: action((state, payload) => {
    // payload needs to have the zone id specified for activation
    state.hairZones[payload] = 1;
  }),
};

export default optionsModel;
