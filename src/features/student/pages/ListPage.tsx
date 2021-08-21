import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ListParams } from 'models';
import React, { useEffect } from 'react';
import { selectCityList, selectCityMap } from 'redux/city/slice';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from 'redux/student/slice';
import StudentFilter from '../components/StudentFilter';
import StudentTable from '../components/StudentTable';

interface Props {}

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  titleContainter: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

function ListPage(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  //selectors
  const loading = useAppSelector(selectStudentLoading);
  const studentList = useAppSelector(selectStudentList);
  const filterList = useAppSelector(selectStudentFilter);
  const paginationList = useAppSelector(selectStudentPagination);

  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  useEffect(() => {
    dispatch(studentActions.fetchStudents(filterList));
  }, [dispatch, filterList]);

  const onChangePagination = (event: React.ChangeEvent<unknown>, page: number): void => {
    dispatch(
      studentActions.setFilter({
        ...filterList,
        _page: page,
      })
    );
  };

  const onSearchChange = (filter: ListParams): void => {
    dispatch(studentActions.setFilterWithDebounce(filter));
  };

  const onFilterChange = (filter: ListParams): void => {
    dispatch(studentActions.setFilter(filter));
  };

  return (
    <Box className={classes.container}>
      {loading ? <LinearProgress className={classes.loading} /> : null}

      <Box className={classes.titleContainter}>
        <Typography variant={'h5'}>Management</Typography>
        <Button variant={'contained'} color={'primary'}>
          Add Student
        </Button>
      </Box>

      <Box mb={3}>
        <StudentFilter
          filter={filterList}
          citys={cityList}
          onSearchChange={onSearchChange}
          onChange={onFilterChange}
        />
      </Box>

      {/* Student List */}
      <StudentTable students={studentList} cityMap={cityMap} />
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          color={'primary'}
          count={Math.ceil(paginationList._totalRows / paginationList._limit)}
          page={paginationList._page}
          onChange={onChangePagination}
        />
      </Box>
    </Box>
  );
}

export default ListPage;
