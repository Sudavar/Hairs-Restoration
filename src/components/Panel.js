import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';

const useStyles = createUseStyles({
  panel: {
    backgroundColor: ({ theme }) => theme.colors.background,
    border: ({ theme }) => `1px solid ${theme.colors.intermediate}`,
    borderRadius: 45,
    width: 'calc(100% - 40px)',
    padding: '20px',
  },
});

function Panel({ children, style }) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.panel} style={{ ...style }}>
      {children}
    </div>
  );
}

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

Panel.defaultProps = {
  style: {},
};

export default Panel;
