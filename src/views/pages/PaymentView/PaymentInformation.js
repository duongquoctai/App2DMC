import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, TextField } from '@mui/material';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: 0,
      paddingTop: theme.spacing(5),
      paddingLeft: theme.spacing(5)
    }
  },
  margin: {
    marginBottom: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

PaymentInformation.propTypes = {
  formik: PropTypes.object.isRequired,
  className: PropTypes.string
};

function PaymentInformation({ formik, className }) {
  const classes = useStyles();
  const { touched, errors, getFieldProps } = formik;

  return (
    <div className={clsx(classes.root, className)}>
      <Box component="h6" sx={{ mb: 5, typography: 'subtitle1' }}>
        Billing Address
      </Box>
      <TextField
        fullWidth
        label="Person name"
        {...getFieldProps('name')}
        error={Boolean(touched.name && errors.name)}
        helperText={touched.name && errors.name}
        className={classes.margin}
      />
      <TextField
        fullWidth
        name="phone"
        label="Phone number"
        {...getFieldProps('phone')}
        error={Boolean(touched.phone && errors.phone)}
        helperText={touched.phone && errors.phone}
        className={classes.margin}
      />
      <TextField
        fullWidth
        name="email"
        label="Email"
        {...getFieldProps('email')}
        error={Boolean(touched.email && errors.email)}
        helperText={touched.email && errors.email}
        className={classes.margin}
      />
      <TextField
        fullWidth
        name="address"
        label="Address"
        {...getFieldProps('address')}
        error={Boolean(touched.address && errors.address)}
        helperText={touched.address && errors.address}
      />
    </div>
  );
}

export default PaymentInformation;
