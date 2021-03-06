import React from 'react';
import Page from '~/components/Page';
import FormDialogs from './FormDialogs';
import AlertDialog from './AlertDialog';
import Block from '~/components/Block';
import ScrollDialog from './ScrollDialog';
import SimpleDialogs from './SimpleDialogs';
import { PATH_APP } from '~/routes/paths';
import MaxWidthDialog from './MaxWidthDialog';
import FullScreenDialogs from './FullScreenDialogs';
import TransitionsDialogs from './TransitionsDialogs';
import HeaderDashboard from '~/components/HeaderDashboard';
import { makeStyles } from '@mui/styles';
import { Card, Grid, Container, CardContent } from '@mui/material';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {}
}));

// ----------------------------------------------------------------------

function DialogView() {
  const classes = useStyles();

  return (
    <Page title="Components | Dialog" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Dialog"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Dialog' }
          ]}
          moreLink="https://next.material-ui.com/components/dialogs"
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Block title="Simple">
                  <SimpleDialogs />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Alerts">
                  <AlertDialog />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Transitions">
                  <TransitionsDialogs />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Form">
                  <FormDialogs />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Full Screen">
                  <FullScreenDialogs />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Max Width Dialog">
                  <MaxWidthDialog />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Scrolling Content Dialogs">
                  <ScrollDialog />
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default DialogView;
