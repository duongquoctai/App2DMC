import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 99,
    minWidth: 200,
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    padding: theme.spacing(2),
    backdropFilter: 'blur(8px)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.grey[900], 0.8)
  },
  label: { color: theme.palette.common.white }
}));

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
  data: PropTypes.array,
  selectedCity: PropTypes.string,
  handleChange: PropTypes.func,
  className: PropTypes.string
};

function ControlPanel({ data, selectedCity, handleChange, className }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {data.map(city => (
        <RadioGroup
          key={city.city}
          value={selectedCity}
          onChange={e => handleChange(e, city)}
        >
          <FormControlLabel
            value={city.city}
            control={<Radio size="small" color="primary" />}
            label={city.city}
            classes={{ label: classes.label }}
          />
        </RadioGroup>
      ))}
    </div>
  );
}

export default ControlPanel;
