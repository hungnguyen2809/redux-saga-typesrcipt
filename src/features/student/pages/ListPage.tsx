import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import apiStudent from 'api/apiStudent';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { toastError, toastSuccess } from 'components/common';
import { ListParams, Student } from 'models';
import React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
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
  const math = useRouteMatch();
  const history = useHistory();
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

  const handleRemoveStudent = async (student: Student, cb: () => void): Promise<void> => {
    try {
      if (student.id) {
        await apiStudent.remove(student.id);
        //Trigger fetch list student with current filter
        const newFilter = { ...filterList };
        dispatch(studentActions.fetchStudents(newFilter));
        cb();
        toastSuccess('Remove student success');
      }
    } catch (error) {
      toastError(error.message);
    }
  };

  const handleModifyStudent = (student: Student) => {
    history.push(`${math.url}/${student.id}`);
  };

  return (
    <Box className={classes.container}>
      {loading ? <LinearProgress className={classes.loading} /> : null}

      <Box className={classes.titleContainter}>
        <Typography variant={'h5'}>Management</Typography>
        <Link to={`${math.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant={'contained'} color={'primary'}>
            Add Student
          </Button>
        </Link>
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
      <StudentTable
        students={studentList}
        cityMap={cityMap}
        onDelete={handleRemoveStudent}
        onModify={handleModifyStudent}
      />
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
