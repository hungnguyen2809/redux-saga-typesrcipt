import { NotFound, PrivateRoute } from 'components/common';
import { AdminLayout } from 'components/layouts';
import LoginPage from 'features/auth/pages/LoginPage';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
  useEffect(() => {
    // apiCity.getAllCity().then((res) => {
    //   console.log(res);
    // });
  }, []);

  return (
    <Switch>
      {/* Có exact nó chỉ đúng với path như vậy nếu vào các route con nó không math lại được */}
      {/* VD: login thì chỉ là login, nếu mà login/abc thì nó không match được */}
      {/* còn nếu không có thì nó chỉ cần có path đó bắt đầu là được */}
      <Route path="/login" component={LoginPage} exact />
      <PrivateRoute path="/admin" component={AdminLayout} />
      {/* Không truyền path thì coi như là nếu nó không có path nào nó sẽ vào */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
