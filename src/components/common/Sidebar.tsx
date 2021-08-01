import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { useRoutes } from 'components/layouts';
import { map } from 'lodash';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&.active > div': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

export function Sidebar(): JSX.Element {
  const classes = useStyles();
  const routes = useRoutes();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main dashboard student">
        {map(routes, (route, idx) => {
          const { icon: Icon } = route;
          return (
            <NavLink key={idx} to={route.path?.toString() || '404'} className={classes.link}>
              <ListItem button>
                <ListItemIcon>{Icon && <Icon />}</ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    </div>
  );
}
