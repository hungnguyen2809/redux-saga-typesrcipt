import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { ReactElement, useEffect } from 'react';
import { studentActions, studentSelectors } from 'redux/student/slice';
import StudentTable from '../components/StudentTable';

interface Props {}

const useStyles = makeStyles((theme) => ({
  container: {},
  titleContainter: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
}));

function ListPage(props: Props): ReactElement {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const loading = useAppSelector(studentSelectors.loading);
  const studentList = useAppSelector(studentSelectors.listStudent);
  const filterList = useAppSelector(studentSelectors.filter);
  const paginationList = useAppSelector(studentSelectors.pagination);

  useEffect(() => {
    dispatch(studentActions.fetchStudents({ _page: 1, _limit: 15 }));
  }, [dispatch]);

  return (
    <Box className={classes.container}>
      <Box className={classes.titleContainter}>
        <Typography variant={'h5'}>Management</Typography>
        <Button variant={'contained'} color={'primary'}>
          Add Student
        </Button>
      </Box>

      {/* Student List */}
      <StudentTable students={studentList} />
    </Box>
  );
}

export default ListPage;
