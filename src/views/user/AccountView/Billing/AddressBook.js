import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify-icons/eva/plus-fill';
import editFill from '@iconify-icons/eva/edit-fill';
import trash2Fill from '@iconify-icons/eva/trash-2-fill';
import { makeStyles } from '@mui/styles';
import { Box, Card, Button, Typography } from '@mui/material';
import { MButton } from '~/@material-extend';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {},
  addressItem: {
    position: 'relative',
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.neutral
  }
}));

// ----------------------------------------------------------------------

AddressBook.propTypes = {
  addressBook: PropTypes.array,
  className: PropTypes.string
};

function AddressBook({ addressBook, className }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <Typography variant="overline" color="textSecondary">
        Billing Info
      </Typography>

      {addressBook.map(address => (
        <div key={address.id} className={classes.addressItem}>
          <Typography variant="subtitle1" gutterBottom>
            {address.name}
          </Typography>

          <Typography variant="body2" gutterBottom>
            <Typography variant="body2" component="span" color="textSecondary">
              Address: &nbsp;
            </Typography>
            {`${address.street}, ${address.city}, ${address.state}, ${address.country} ${address.zipCode}`}
          </Typography>

          <Typography variant="body2" gutterBottom>
            <Typography variant="body2" component="span" color="textSecondary">
              Phone: &nbsp;
            </Typography>
            {address.phone}
          </Typography>

          <Box sx={{ mt: 1 }}>
            <MButton
              color="error"
              size="small"
              startIcon={<Icon icon={trash2Fill} />}
              onClick={() => {}}
              sx={{ mr: 1 }}
            >
              Delete
            </MButton>
            <Button
              size="small"
              color="primary"
              startIcon={<Icon icon={editFill} />}
              onClick={() => {}}
            >
              Edit
            </Button>
          </Box>
        </div>
      ))}

      <Button size="small" startIcon={<Icon icon={plusFill} />} sx={{ mt: 3 }}>
        Add new address
      </Button>
    </Card>
  );
}

export default AddressBook;
