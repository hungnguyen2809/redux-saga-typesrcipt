import { useAppDispatch } from 'app/hooks';
import { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { cityActions } from 'redux/city/slice';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

function StudentPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const match = useRouteMatch();

  useEffect(() => {
    dispatch(cityActions.fetchCitys());
  }, [dispatch]);

  return (
    <Switch>
      <Route path={match.path} exact>
        <ListPage />
      </Route>
      <Route path={`${match.path}/add`}>
        <AddEditPage />
      </Route>
      <Route path={`${match.path}/:studentId`}>
        <AddEditPage />
      </Route>
    </Switch>
  );
}

export default StudentPage;
