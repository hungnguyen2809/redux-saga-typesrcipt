import React from 'react';
import { NotFound, PrivateRoute } from 'components/common';
import { Route, Switch } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

const LoginPage = React.lazy(() => import('features/auth/pages/LoginPage'));
const DefaultLayout = React.lazy(() => import('components/layouts/DefaultLayout'));

function App() {
  return (
    <React.Suspense fallback={<LinearProgress />}>
      <Switch>
        {/* Có exact nó chỉ đúng với path như vậy nếu vào các route con nó không math lại được */}
        {/* VD: login thì chỉ là login, nếu mà login/abc thì nó không match được */}
        {/* còn nếu không có thì nó chỉ cần có path đó bắt đầu là được */}
        <Route path="/login" component={LoginPage} exact />
        <PrivateRoute path="/admin" component={DefaultLayout} />
        {/* Không truyền path thì coi như là nếu nó không có path nào nó sẽ vào */}
        <Route component={NotFound} />
      </Switch>
    </React.Suspense>
  );
}

export default App;
