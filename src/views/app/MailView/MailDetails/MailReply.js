import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import attach2Fill from '@iconify-icons/eva/attach-2-fill';
import roundAddPhotoAlternate from '@iconify-icons/ic/round-add-photo-alternate';
import { makeStyles } from '@mui/styles';
import { Box, Button, TextField, IconButton } from '@mui/material';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {},
  textarea: {
    '& fieldset': {
      border: 'none !important'
    }
  }
}));

// ----------------------------------------------------------------------

MailReply.propTypes = {
  className: PropTypes.string
};

function MailReply({ className, ...other }) {
  const classes = useStyles();
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');

  const handleChangeMessage = event => {
    setMessage(event.target.value);
  };

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <TextField
        fullWidth
        multiline
        minRows={2}
        maxRows={8}
        value={message}
        placeholder="Type a message"
        onChange={handleChangeMessage}
        className={classes.textarea}
      />

      <Box
        sx={{
          mr: 3,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <IconButton size="small" onClick={handleAttach}>
          <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
        </IconButton>

        <Box sx={{ ml: 1, mr: 2 }}>
          <IconButton size="small" onClick={handleAttach}>
            <Icon icon={attach2Fill} width={24} height={24} />
          </IconButton>
        </Box>

        <Button variant="contained">Send</Button>
      </Box>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </div>
  );
}

export default MailReply;
