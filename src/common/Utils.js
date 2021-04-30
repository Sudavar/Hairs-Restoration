/* eslint-disable import/prefer-default-export */

/**
 * Clamp the given value between an upper and lower bound.
 *
 * @param {number} min    Lower bound
 * @param {number} val    Value to clamp
 * @param {number} max    Upper bound
 */
export const clamp = (min, val, max) => {
  if (val < min) {
    return min;
  }

  if (val > max) {
    return max;
  }

  return val;
};
