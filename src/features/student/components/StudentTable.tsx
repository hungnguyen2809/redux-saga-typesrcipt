import { Box, Button, Paper } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { City, Student } from 'models';
import React from 'react';
import { capitalizeString, getMarkNumber } from 'utils';

interface Props {
  students: Student[];
  cityMap: { [key: string]: City };
  onModify?: (student: Student) => void;
  onDelete?: (student: Student, cb: () => void) => void;
}

const useStyles = makeStyles((theme) => ({
  table: {},
  edit: { margin: theme.spacing(1) },
}));

function StudentTable({ students, cityMap, onModify, onDelete }: Props): JSX.Element {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student: Student): void => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleRemoveConfirm = () => {
    if (onDelete && selectedStudent) {
      onDelete(selectedStudent, handleClose);
    }
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} size={'small'} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align={'right'}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell width={310}>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{capitalizeString(row.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkNumber(row.mark)}>{row.mark}</Box>
                </TableCell>
                <TableCell>{cityMap[row.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    size={'small'}
                    className={classes.edit}
                    color={'primary'}
                    onClick={() => {
                      onModify && onModify(row);
                    }}
                  >
                    Modify
                  </Button>
                  <Button
                    size={'small'}
                    color={'secondary'}
                    onClick={() => {
                      handleRemoveClick(row);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Alert</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you watn to remove student named "{selectedStudent?.name}" ?<br />
            This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant={'outlined'}>
            Cancel
          </Button>
          <Button onClick={handleRemoveConfirm} color="secondary" variant={'contained'}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default StudentTable;
