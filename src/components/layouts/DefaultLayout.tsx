import { Box, makeStyles } from '@material-ui/core';
import { Header, Sidebar } from 'components/common';
import { Switcher } from 'components/switcher';
import { useRoutes } from './useRoutes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '250px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  },
}));

const DefaultLayout = (): JSX.Element => {
  const styles = useStyles();
  const routes = useRoutes();

  return (
    <Box className={styles.root}>
      <Box className={styles.header}>
        <Header />
      </Box>
      <Box className={styles.sidebar}>
        <Sidebar />
      </Box>
      <Box className={styles.main}>
        <Switcher routes={routes} />
      </Box>
    </Box>
  );
};
export default DefaultLayout;
