import { Redirect, Route, RouteProps } from 'react-router-dom';

export const PrivateRoute = (props: RouteProps): JSX.Element => {
  const isLogged = localStorage.getItem('access_token');

  if (!isLogged) {
    return <Redirect to={'/login'} />;
  }

  return <Route {...props} />;
};
