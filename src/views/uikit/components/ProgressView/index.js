import Linear from './Linear';
import Circular from './Circular';
import Page from '~/components/Page';
import { PATH_APP } from '~/routes/paths';
import React, { useState, useEffect, useRef } from 'react';
import HeaderDashboard from '~/components/HeaderDashboard';
import { makeStyles } from '@mui/styles';
import { Card, Container, CardHeader, CardContent } from '@mui/material';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

function ProgressView() {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Page title="Components | Progress" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Progress"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Progress' }
          ]}
          moreLink="https://next.material-ui.com/components/progress"
        />

        <Card className={classes.margin}>
          <CardHeader title="Circular" />
          <CardContent>
            <Circular progress={progress} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Linear" />
          <CardContent>
            <Linear progress={progress} buffer={buffer} />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default ProgressView;
