import Portal from '@material-ui/core/Portal';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';

import AppHeaderContext from '../AppLayout/AppHeaderContext';
import Skeleton from '../Skeleton';

export interface AppHeaderProps {
  children: React.ReactNode;
  onBack();
}

const styles = (theme: Theme) =>
  createStyles({
    backArrow: {
      fontSize: 30
    },
    menuButton: {
      flex: "0 0 auto",
      marginLeft: theme.spacing() * -2,
      marginRight: theme.spacing(),
      marginTop: -theme.spacing() * 2
    },
    root: {
      "&:hover": {
        color: theme.typography.body2.color
      },
      alignItems: "center",
      color: theme.palette.grey[500],
      cursor: "pointer",
      display: "flex",
      marginTop: theme.spacing() / 2,
      transition: theme.transitions.duration.standard + "ms"
    },
    skeleton: {
      marginBottom: theme.spacing() * 2,
      width: "10rem"
    },
    title: {
      color: "inherit",
      flex: 1,
      marginLeft: theme.spacing(),
      textTransform: "uppercase"
    }
  });
const AppHeader = withStyles(styles, { name: "AppHeader" })(
  ({
    children,
    classes,
    onBack
  }: AppHeaderProps & WithStyles<typeof styles>) => (
    <AppHeaderContext.Consumer>
      {anchor =>
        anchor ? (
          <Portal container={anchor.current}>
            <div className={classes.root} onClick={onBack}>
              <ArrowBackIcon className={classes.backArrow} />
              {children ? (
                <Typography className={classes.title}>{children}</Typography>
              ) : (
                <Skeleton className={classes.skeleton} />
              )}
            </div>
          </Portal>
        ) : null
      }
    </AppHeaderContext.Consumer>
  )
);
AppHeader.displayName = "AppHeader";
export default AppHeader;
