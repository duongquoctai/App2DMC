import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MapGL, { Layer, Source } from 'react-map-gl';
import {
  ControlScale,
  ControlGeolocate,
  ControlNavigation,
  ControlFullscreen
} from './controls';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {}
}));

// ----------------------------------------------------------------------

function pointOnCircle({ center, angle, radius }) {
  return {
    type: 'Point',
    coordinates: [
      center[0] + Math.cos(angle) * radius,
      center[1] + Math.sin(angle) * radius
    ]
  };
}

GLGeoJSONAnimation.propTypes = {
  className: PropTypes.string
};

function GLGeoJSONAnimation({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  let animation = null;
  const [pointData, setPointData] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: -100,
    zoom: 3,
    bearing: 0,
    pitch: 0
  });

  const pointLayer = {
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': theme.palette.error.main
    }
  };

  useEffect(() => {
    animatePoint();
    return () => {
      window.cancelAnimationFrame(animation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation]);

  const animatePoint = () => {
    setPointData(
      pointOnCircle({
        center: [-100, 0],
        angle: Date.now() / 1000,
        radius: 20
      })
    );
    animation = window.requestAnimationFrame(animatePoint);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <MapGL
        {...viewport}
        onViewportChange={viewport => setViewport(viewport)}
        {...other}
      >
        <ControlScale />
        <ControlNavigation />
        <ControlFullscreen />
        <ControlGeolocate />

        {pointData && (
          <Source type="geojson" data={pointData}>
            <Layer {...pointLayer} />
          </Source>
        )}
      </MapGL>
    </div>
  );
}

export default GLGeoJSONAnimation;
