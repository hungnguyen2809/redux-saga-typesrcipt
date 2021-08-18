import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { dashboardActions, dashboardSelectors } from 'redux/dashboard/slice';

function DashbroadPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(dashboardSelectors.loadingDashboard);
  const statistics = useAppSelector(dashboardSelectors.statisticsDashboard);
  const highestStudents = useAppSelector(dashboardSelectors.highestStudentsDashboard);
  const lowestStudents = useAppSelector(dashboardSelectors.lowestStudentsDashboard);
  const rankingByCitys = useAppSelector(dashboardSelectors.rankByCitysDashboard);

  console.log({
    loading,
    statistics,
    highestStudents,
    lowestStudents,
    rankingByCitys,
  });

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return <div>Dashbraod</div>;
}

export default DashbroadPage;
