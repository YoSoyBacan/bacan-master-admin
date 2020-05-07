import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';

interface HrProps {
  className?: string;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.divider,
      border: "none",
      display: "block",
      height: 1,
      margin: 0,
      width: "100%"
    }
  });

export const Hr = withStyles(styles, { name: "Hr" })(
  ({ className, classes }: HrProps & WithStyles<typeof styles>) => (
    <hr className={classNames(classes.root, className)} />
  )
);
Hr.displayName = "Hr";
export default Hr;
