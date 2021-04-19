/* eslint-disable no-param-reassign */
import { action, computed } from 'easy-peasy';

const optionsModel = {
  hairLossLevel: 0.4, // TODO: Change that back to `0`
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
      name: 'Zone 1',
      maxGrafts: 495,
      active: true, // TODO: Change that back to `false`
    },
    {
      id: 'zone2',
      name: 'Zone 2',
      maxGrafts: 990,
      active: true, // TODO: Change that back to `false`
    },
    {
      id: 'zone3',
      name: 'Zone 3',
      maxGrafts: 1575,
      active: false,
    },
    {
      id: 'zone4',
      name: 'Zone 4',
      maxGrafts: 1170,
      active: true, // TODO: Change that back to `false`
    },
    {
      id: 'zone5',
      name: 'Zone 5',
      maxGrafts: 1395,
      active: false,
    },
    {
      id: 'zone6',
      name: 'Zone 6',
      maxGrafts: 1170,
      active: false,
    },
    {
      id: 'zone7',
      name: 'Zone 7',
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
