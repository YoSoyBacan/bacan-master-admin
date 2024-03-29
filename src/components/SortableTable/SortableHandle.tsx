import { Theme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import makeStyles from '@material-ui/styles/makeStyles';
import Draggable from '@saleor/icons/Draggable';
import React from 'react';
import { SortableHandle as SortableHandleHoc } from 'react-sortable-hoc';

const useStyles = makeStyles((theme: Theme) => ({
  columnDrag: {
    "&:first-child": {
      paddingRight: theme.spacing() * 2
    },
    cursor: "grab",
    width: 48 + theme.spacing() * 1.5
  }
}));

const SortableHandle = SortableHandleHoc(() => {
  const classes = useStyles({});

  return (
    <TableCell className={classes.columnDrag}>
      <Draggable />
    </TableCell>
  );
});

export default SortableHandle;
