import React from 'react';
import map from 'lodash/map';
import { AppRouteProps } from 'components/layouts';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

interface Props {
  routes: AppRouteProps[];
}

export const Switcher = (props: Props): JSX.Element => {
  return (
    <Switch>
      {map(props.routes, (route, idx): React.ReactNode => {
        const { component: Component } = route; //vừa distructuring vừa đặt lại tên
        return (
          Component && (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              render={(props: RouteComponentProps): JSX.Element => (
                <React.Fragment>
                  <Component {...props} />
                </React.Fragment>
              )}
            />
          )
        );
      })}
    </Switch>
  );
};
