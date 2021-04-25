import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';

const useStyles = createUseStyles({
  panel: {
    backgroundColor: ({ theme }) => theme.colors.light,
    border: ({ theme }) => `1px solid ${theme.colors.intermediate}`,
    borderRadius: 34,
    maxWidth: '260px',
    padding: '20px',
  },
});

function Panel({ children }) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.panel}>
      {children}
    </div>
  );
}

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Panel;
