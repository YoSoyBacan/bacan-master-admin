import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';

export interface TabContainerProps {
  children: React.ReactNode | React.ReactNodeArray;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`
    }
  });

const TabContainer = withStyles(styles, {
  name: "TabContainer"
})(({ classes, children }: TabContainerProps & WithStyles<typeof styles>) => (
  <div className={classes.root}>{children}</div>
));
TabContainer.displayName = "TabContainer";

export default TabContainer;
