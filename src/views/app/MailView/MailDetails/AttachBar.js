import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import Scrollbars from '~/components/Scrollbars';
import arrowCircleDownFill from '@iconify-icons/eva/arrow-circle-down-fill';
import { getFileType, getFileName, getFileThumb } from '~/utils/getFileFormat';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, Typography, IconButton } from '@mui/material';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `solid 1px ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.neutral
  },
  thumb: {
    width: 48,
    height: 48,
    display: 'flex',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.background.paper,
    border: `solid 1px ${theme.palette.divider}`,
    color: theme.palette.text.disabled,
    '& img': { width: '100%', height: '100%' },
    '&:hover': { '& $download': { opacity: 1 } }
  },
  info: {
    maxWidth: 56,
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(0.5)
  },
  download: {
    opacity: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(8px)',
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: alpha(theme.palette.grey[900], 0.64),
    transition: theme.transitions.create('opacity'),
    '& svg': {
      transition: theme.transitions.create('color'),
      color: alpha(theme.palette.common.white, 0.64),
      '&:hover': { color: theme.palette.common.white }
    }
  }
}));

function FileItem({ file }) {
  const classes = useStyles();

  return (
    <Box key={file} sx={{ mx: 0.75 }}>
      <div className={classes.thumb}>
        {getFileThumb(file)}
        <div className={classes.download}>
          <IconButton>
            <Icon icon={arrowCircleDownFill} />
          </IconButton>
        </div>
      </div>
      <div className={classes.info}>
        <Typography noWrap component="div" variant="caption">
          {getFileName(file)}
        </Typography>
        <Typography component="div" variant="caption">
          .{getFileType(file)}
        </Typography>
      </div>
    </Box>
  );
}

// ----------------------------------------------------------------------

AttachBar.propTypes = {
  mail: PropTypes.object.isRequired,
  className: PropTypes.string
};

function AttachBar({ mail, className, ...other }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Scrollbars>
        <Box sx={{ display: 'flex' }}>
          {mail.files.map(file => (
            <FileItem key={file} file={file} />
          ))}
        </Box>
      </Scrollbars>
    </div>
  );
}

export default AttachBar;
