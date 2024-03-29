import Avatar from '@material-ui/core/Avatar';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Cached from '@material-ui/icons/Cached';
import classNames from 'classnames';
import React from 'react';

import Image from '../../icons/Image';

export const AVATAR_MARGIN = 56;

const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      background: "none",
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 2,
      color: "#bdbdbd",
      display: "inline-flex",
      padding: theme.spacing() / 2
    },
    children: {
      alignSelf: "center",
      marginLeft: theme.spacing() * 2,
      width: "100%"
    },
    content: {
      alignItems: "center",
      display: "flex"
    },
    root: {
      paddingRight: theme.spacing() * 3,
      width: "1%"
    }
  });

interface TableCellAvatarProps extends WithStyles<typeof styles> {
  className?: string;
  thumbnail?: string;
  avatarProps?: string;
  children?: React.ReactNode | React.ReactNodeArray;
}

const TableCellAvatar = withStyles(styles, { name: "TableCellAvatar" })(
  ({
    classes,
    children,
    className,
    thumbnail,
    avatarProps,
    ...props
  }: TableCellAvatarProps) => (
    <TableCell className={classNames(classes.root, className)} {...props}>
      <div className={classes.content}>
        {thumbnail === undefined ? (
          <Avatar className={classNames(classes.avatar, avatarProps)}>
            <Cached color="primary" />
          </Avatar>
        ) : thumbnail === null ? (
          <Avatar className={classNames(classes.avatar, avatarProps)}>
            <Image color="primary" />
          </Avatar>
        ) : (
          <Avatar
            className={classNames(classes.avatar, avatarProps)}
            src={thumbnail}
          />
        )}
        <div className={classes.children}>{children}</div>
      </div>
    </TableCell>
  )
);
TableCellAvatar.displayName = "TableCellAvatar";
export default TableCellAvatar;
