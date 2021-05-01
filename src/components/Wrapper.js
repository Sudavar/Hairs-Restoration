import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
  },
});

function Wrapper({ children, style }) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.wrapper} style={{ ...style }}>
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

Wrapper.defaultProps = {
  style: {},
};

export default Wrapper;
