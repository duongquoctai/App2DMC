import clsx from 'clsx';
import React from 'react';
import UserItem from './UserItem';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Grid, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {}
}));

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    {[...Array(8)].map((item, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Skeleton
          component={Box}
          variant="rectangular"
          sx={{ width: '100%', paddingTop: '115%', borderRadius: 2 }}
        />
      </Grid>
    ))}
  </Grid>
);

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  className: PropTypes.string
};

function UserList({ users, className }) {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={clsx(classes.root, className)}>
      {users.map(user => (
        <Grid key={user.id} item xs={12} sm={6} md={4}>
          <UserItem user={user} />
        </Grid>
      ))}

      {!users.length && SkeletonLoad}
    </Grid>
  );
}

export default UserList;
