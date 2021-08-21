import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import {
  dashboardActions,
  selectDashboardHighestStudents,
  selectDashboardLoading,
  selectDashboardLowestStudents,
  selectDashboardRankByCitys,
  selectDashboardStatistics,
} from 'redux/dashboard/slice';
import RankingStudents from './components/RankingStudents';
import StatisticsItem from './components/StatisticItem';
import Widget from './components/Widget';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },

  title: {
    margin: theme.spacing(2, 0),
  },
}));

function DashbroadPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudents = useAppSelector(selectDashboardHighestStudents);
  const lowestStudents = useAppSelector(selectDashboardLowestStudents);
  const rankingByCitys = useAppSelector(selectDashboardRankByCitys);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.container}>
      {/* Loading */}
      {loading ? <LinearProgress className={classes.loading} /> : null}
      {/* Statistic Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<PeopleAlt color={'primary'} fontSize={'large'} />}
            label={'male'}
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<PeopleAlt color={'primary'} fontSize={'large'} />}
            label={'female'}
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<PeopleAlt color={'primary'} fontSize={'large'} />}
            label={'mark >= 8'}
            value={statistics.hightMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<PeopleAlt color={'primary'} fontSize={'large'} />}
            label={'mark <= 5'}
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      {/* All student ranking */}
      <Typography variant={'h5'} className={classes.title}>
        All Student
      </Typography>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Widget title={'Student width highest mark'}>
              <RankingStudents students={highestStudents} />
            </Widget>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Widget title={'Student width lowest mark'}>
              <RankingStudents students={lowestStudents} />
            </Widget>
          </Grid>
        </Grid>
      </Box>

      {/* Ranking by City */}
      <Typography variant={'h5'} className={classes.title}>
        Ranking by City
      </Typography>
      <Box mt={3}>
        <Grid container spacing={3}>
          {rankingByCitys.map((ranking) => {
            return (
              <Grid key={ranking.id} item xs={12} md={6} lg={3}>
                <Widget title={ranking.name}>
                  <RankingStudents students={ranking.rankings} />
                </Widget>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default DashbroadPage;
