import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';

import { clamp } from '../common/Utils';

const useStyles = createUseStyles({
  container: {
    width: '100%',
    height: '20px',
    borderRadius: '9999px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'relative',
    cursor: 'pointer',
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#000',
    borderRadius: '9999px',
  },
});

function Slider({ steps, onChange, initialValue }) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  // Component state
  const [value, setValue] = useState(initialValue);
  const [isPressed, _setPressed] = useState(false);

  // Workaround to access the state within mouse event listeners attached to the `window`
  const isPressedRef = useRef(isPressed);
  const setPressed = (val) => {
    isPressedRef.current = val;
    _setPressed(val);
  };

  // Memoized value as a percentage
  const percentage = useMemo(() => value * 100, [value]);

  // Reference to the slider root element so we can access its width
  const sliderRef = useRef();

  // Invoke the `onChange` function (passed as a prop) whenever the `value` changes
  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value]);

  /**
   * Return the mouse coordinate on the x-axis
   *
   * @param {MouseEvent} event
   * @return {number}
   */
  const getMouseX = (event) => event.clientX - sliderRef.current.getBoundingClientRect().left;

  /**
   * Return the slider value in the current position without taking into account the steps
   *
   * @param {MouseEvent} event
   * @return {number}
   */
  const getValueInCurrentPosition = (event) => {
    const sliderWidth = sliderRef.current.clientWidth;
    const mouseX = getMouseX(event);

    return clamp(0, (1 / sliderWidth) * mouseX, 1);
  };

  /**
   * Return the slider value in the current step (or the one closest to our position)
   *
   * @param {number} valueInCurrentPosition
   * @return {number}
   */
  const getValueInCurrentStep = (valueInCurrentPosition) => {
    const stepSize = 1 / (steps - 1);
    const stepDistanceLimit = stepSize / 2;

    for (let i = 0; i < steps; i += 1) {
      const stepX = i * stepSize;
      const distance = Math.abs(stepX - valueInCurrentPosition);
      if (distance <= stepDistanceLimit) {
        return i * stepSize;
      }
    }

    return null;
  };

  /**
   * Compute and return the slider value based on whether this slider contains steps or not
   *
   * @param {MouseEvent} event
   * @return {number}
   */
  const computeValue = (event) => {
    const valueInCurrentPosition = getValueInCurrentPosition(event);

    if (steps === null) {
      return valueInCurrentPosition;
    }

    return getValueInCurrentStep(valueInCurrentPosition);
  };

  /**
   * Update the slider value
   *
   * @param {MouseEvent} event
   */
  const updateValue = (event) => {
    setValue(computeValue(event));
  };

  /**
   * Handle mouse down events
   *
   * @param {MouseEvent} event
   */
  const onMouseDown = (event) => {
    setPressed(true);
    updateValue(event);
  };

  /**
   * Handle mouse move events
   *
   * @param {MouseEvent} event
   */
  const onMouseMove = (event) => {
    if (isPressedRef.current) {
      updateValue(event);
    }
  };

  /**
   * Handle mouse up events
   *
   * @param {MouseEvent} event
   */
  const onMouseUp = () => {
    setPressed(false);
  };

  /**
   * Handle key down events
   *
   * @param {KeyboardEvent} event
   */
  const onKeyDown = (event) => {
    if (steps) {
      let newValue = value;
      const stepSize = 1 / (steps - 1);

      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        newValue -= stepSize;
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        newValue += stepSize;
      }

      setValue(clamp(0, newValue, 1));
    }
  };

  useEffect(() => {
    // Add event listeners on component mount
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      // Remove event listeners on component unmount
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div
      className={classes.container}
      onMouseDown={onMouseDown}
      onKeyDown={onKeyDown}
      role="slider"
      aria-valuenow={percentage}
      tabIndex={0}
      ref={sliderRef}
    >
      <div
        className={classes.bar}
        style={{ width: `${percentage.toFixed(2)}%` }}
      />
    </div>
  );
}

Slider.propTypes = {
  steps: PropTypes.number,
  onChange: PropTypes.func,
  initialValue: PropTypes.number,
};

Slider.defaultProps = {
  steps: null,
  onChange: null,
  initialValue: 0,
};

export default Slider;
