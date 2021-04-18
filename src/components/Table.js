import React from 'react';
import PropTypes from 'prop-types';

// import { createUseStyles, useTheme } from 'react-jss';

function Table({ columns, data }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => <th>{column}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {row.map((item) => <td>{item}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default Table;
