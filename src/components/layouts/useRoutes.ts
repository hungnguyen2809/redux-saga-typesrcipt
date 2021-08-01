import { RouteProps } from 'react-router-dom';
import { Dashboard, PeopleAlt } from '@material-ui/icons';
import DashbroadPage from 'features/dashbroad';
import StudentPage from 'features/student';

export interface AppRouteProps extends RouteProps {
  name: string;
  icon?: Function;
}

const routes: AppRouteProps[] = [
  {
    name: 'Dashboard',
    icon: Dashboard,
    path: '/admin/dashboard',
    component: DashbroadPage,
  },
  {
    name: 'Student',
    icon: PeopleAlt,
    path: '/admin/student',
    component: StudentPage,
  },
];

export const useRoutes = (): AppRouteProps[] => {
  return routes;
};
