import clsx from 'clsx';
import React from 'react';
import PostCard from './PostCard';
import PropTypes from 'prop-types';
import AboutCard from './AboutCard';
import PostInput from './PostInput';
import FollowCard from './FollowCard';
import SocialCard from './SocialCard';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
  authUser: PropTypes.object,
  className: PropTypes.string
};

function Profile({ myProfile, posts, authUser, className }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FollowCard profile={myProfile} className={classes.margin} />
          <AboutCard profile={myProfile} className={classes.margin} />
          <SocialCard profile={myProfile} />
        </Grid>

        <Grid item xs={12} md={8}>
          <PostInput className={classes.margin} />
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              profile={myProfile}
              authUser={authUser}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
