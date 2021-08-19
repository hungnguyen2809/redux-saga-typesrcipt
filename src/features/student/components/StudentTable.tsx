import { Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Student } from 'models';

interface Props {
  students: Student[];
  onModify?: (student: Student) => void;
  onDelete?: (student: Student) => void;
}

const useStyles = makeStyles((theme) => ({
  table: {},
  edit: { margin: theme.spacing(1) },
}));

function StudentTable({ students, onModify, onDelete }: Props): JSX.Element {
  const classes = useStyles();

  return (
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
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.mark}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell align="right">
                <Button
                  className={classes.edit}
                  variant={'contained'}
                  color={'primary'}
                  onClick={() => {
                    onModify && onModify(row);
                  }}
                >
                  Modify
                </Button>
                <Button
                  variant={'outlined'}
                  color={'secondary'}
                  onClick={() => {
                    onDelete?.(row);
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
  );
}

export default StudentTable;
