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

  hairZones: [
    {
      id: 'zone1',
      number: 1,
      maxGrafts: 495,
      active: false,
    },
    {
      id: 'zone2',
      number: 2,
      maxGrafts: 990,
      active: false,
    },
    {
      id: 'zone3',
      number: 3,
      maxGrafts: 1575,
      active: false,
    },
    {
      id: 'zone4',
      number: 4,
      maxGrafts: 1170,
      active: false,
    },
    {
      id: 'zone5',
      number: 5,
      maxGrafts: 1395,
      active: false,
    },
    {
      id: 'zone6',
      number: 6,
      maxGrafts: 1170,
      active: false,
    },
    {
      id: 'zone7',
      number: 7,
      maxGrafts: 1080,
      active: false,
    },
  ],

  /**
   * Toggle the `active` property of the hair zone with the given zone id
   */
  toggleHairZone: action((state, payload) => {
    const index = state.hairZones.findIndex((item) => item.id === payload);
    state.hairZones[index].active = !state.hairZones[index].active;
  }),
};

export default optionsModel;
