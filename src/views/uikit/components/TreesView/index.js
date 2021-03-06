import React from 'react';
import Page from '~/components/Page';
import Block from '~/components/Block';
import { PATH_APP } from '~/routes/paths';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSpring, animated } from 'react-spring/web.cjs';
import HeaderDashboard from '~/components/HeaderDashboard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { alpha } from '@mui/material/styles';
import { makeStyles, withStyles } from '@mui/styles';
import { Card, Grid, Collapse, Container, CardContent } from '@mui/material';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {},
  treeBasic: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400
  }
}));

// ----------------------------------------------------------------------

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
    }
  });
  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = withStyles(theme => ({
  iconContainer: { '& .close': { opacity: 0.3 } },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
  }
}))(props => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

function TreesView() {
  const classes = useStyles();

  return (
    <Page title="Components | Tree View" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Tree View"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Tree View' }
          ]}
          moreLink="https://next.material-ui.com/components/tree-view"
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Block title="Basic">
                  <TreeView
                    className={classes.treeBasic}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    defaultEndIcon={null}
                  >
                    <TreeItem nodeId="1" label="Applications">
                      <TreeItem nodeId="2" label="Calendar" />
                      <TreeItem nodeId="3" label="Chrome" />
                      <TreeItem nodeId="4" label="Webstorm" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="Documents">
                      <TreeItem nodeId="10" label="OSS" />
                      <TreeItem nodeId="6" label="Material-UI">
                        <TreeItem nodeId="7" label="src">
                          <TreeItem nodeId="8" label="index.js" />
                          <TreeItem nodeId="9" label="tree-view.js" />
                        </TreeItem>
                      </TreeItem>
                    </TreeItem>
                  </TreeView>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Multi Select">
                  <TreeView
                    multiSelect
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    defaultEndIcon={null}
                    className={classes.treeBasic}
                  >
                    <TreeItem nodeId="1" label="Applications">
                      <TreeItem nodeId="2" label="Calendar" />
                      <TreeItem nodeId="3" label="Chrome" />
                      <TreeItem nodeId="4" label="Webstorm" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="Documents">
                      <TreeItem nodeId="6" label="Material-UI">
                        <TreeItem nodeId="7" label="src">
                          <TreeItem nodeId="8" label="index.js" />
                          <TreeItem nodeId="9" label="tree-view.js" />
                        </TreeItem>
                      </TreeItem>
                    </TreeItem>
                  </TreeView>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Customized">
                  <TreeView
                    className={classes.treeBasic}
                    defaultExpanded={['1']}
                  >
                    <StyledTreeItem nodeId="1" label="Main">
                      <StyledTreeItem nodeId="2" label="Hello" />
                      <StyledTreeItem nodeId="3" label="Subtree with children">
                        <StyledTreeItem nodeId="6" label="Hello" />
                        <StyledTreeItem
                          nodeId="7"
                          label="Sub-subtree with children"
                        >
                          <StyledTreeItem nodeId="9" label="Child 1" />
                          <StyledTreeItem nodeId="10" label="Child 2" />
                          <StyledTreeItem nodeId="11" label="Child 3" />
                        </StyledTreeItem>
                        <StyledTreeItem nodeId="8" label="Hello" />
                      </StyledTreeItem>
                      <StyledTreeItem nodeId="4" label="World" />
                      <StyledTreeItem nodeId="5" label="Something something" />
                    </StyledTreeItem>
                  </TreeView>
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default TreesView;
