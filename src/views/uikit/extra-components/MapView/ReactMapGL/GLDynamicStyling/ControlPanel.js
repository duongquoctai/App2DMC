import clsx from 'clsx';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import MAP_STYLE from '../data/map-style-basic-v8.json';
import { makeStyles, alpha, useTheme } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';

// ----------------------------------------------------------------------

const defaultMapStyle = fromJS(MAP_STYLE);

const CATEGORIES = [
  'labels',
  'roads',
  'buildings',
  'parks',
  'water',
  'background'
];

const LAYER_SELECTOR = {
  background: /background/,
  water: /water/,
  parks: /park/,
  buildings: /building/,
  roads: /bridge|road|tunnel/,
  labels: /label|place|poi/
};

const COLOR_CLASS = {
  line: 'line-color',
  fill: 'fill-color',
  background: 'background-color',
  symbol: 'text-color'
};

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
  row: {
    padding: theme.spacing(1, 0),
    display: 'flex'
  },
  label: {
    flexGrow: 1,
    textTransform: 'capitalize',
    color: 'white'
  },
  colorBox: {
    width: 20,
    height: 20,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    border: `solid 1px ${theme.palette.grey[500]}`,
    '& input': {
      width: 12,
      height: 12,
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      WebkitAppearance: 'none',
      backgroundColor: 'transparent',
      '&::-webkit-color-swatch-wrapper': { padding: 0 },
      '&::-moz-color-swatch': { border: 'none', borderRadius: '50%' },
      '&::-webkit-color-swatch': { border: 'none', borderRadius: '50%' }
    }
  }
}));

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
  onChange: PropTypes.func
};

function ControlPanel({ onChange, className }) {
  const classes = useStyles();
  const theme = useTheme();
  const [visibility, setVisibility] = useState({
    water: true,
    parks: true,
    roads: true,
    labels: true,
    buildings: true,
    background: true
  });
  const [color, setColor] = useState({
    water: theme.palette.grey[900],
    labels: theme.palette.grey[800],
    parks: theme.palette.primary.dark,
    buildings: theme.palette.grey[900],
    background: theme.palette.grey[700],
    roads: theme.palette.warning.darker
  });

  useEffect(() => {
    updateMapStyle({ color, visibility });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, visibility]);

  const onColorChange = (event, name) => {
    const state = { ...color, [name]: event.target.value };
    setColor(state);
    updateMapStyle({ color: state, visibility: visibility });
  };

  const onVisibilityChange = (event, name) => {
    const state = {
      ...visibility,
      [name]: event.target.checked
    };
    setVisibility(state);
    updateMapStyle({ color: color, visibility: state });
  };

  const updateMapStyle = ({ color, visibility }) => {
    const layers = defaultMapStyle
      .get('layers')
      .filter(layer => {
        const id = layer.get('id');
        return CATEGORIES.every(
          name => visibility[name] || !LAYER_SELECTOR[name].test(id)
        );
      })
      .map(layer => {
        const id = layer.get('id');
        const type = layer.get('type');
        const category = CATEGORIES.find(name => LAYER_SELECTOR[name].test(id));
        if (category && COLOR_CLASS[type]) {
          return layer.setIn(['paint', COLOR_CLASS[type]], color[category]);
        }
        return layer;
      });
    onChange(defaultMapStyle.set('layers', layers));
  };

  return (
    <div className={clsx(classes.root, className)}>
      {CATEGORIES.map(name => {
        return (
          <div key={name} className={classes.row}>
            <div className={classes.colorBox}>
              <input
                type="color"
                value={color[name]}
                disabled={!visibility[name]}
                onChange={e => onColorChange(e, name)}
              />
            </div>
            <div className={classes.label}>{name}</div>
            <Switch
              color="primary"
              size="small"
              checked={visibility[name]}
              onChange={e => onVisibilityChange(e, name)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ControlPanel;
