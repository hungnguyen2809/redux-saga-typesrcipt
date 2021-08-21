import { Box, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { City, Student } from 'models';
import { capitalizeString, getMarkNumber } from 'utils';

interface Props {
  students: Student[];
  cityMap: { [key: string]: City };
  onModify?: (student: Student) => void;
  onDelete?: (student: Student) => void;
}

const useStyles = makeStyles((theme) => ({
  table: {},
  edit: { margin: theme.spacing(1) },
}));

function StudentTable({ students, cityMap, onModify, onDelete }: Props): JSX.Element {
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
