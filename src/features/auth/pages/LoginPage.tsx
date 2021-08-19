import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Redirect } from 'react-router-dom';
import { authActions, isLoggingSelector } from 'redux/auth/slice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(3),
  },
}));

const isLogin = () => {
  return localStorage.getItem('access_token');
};

const LoginPage = (): JSX.Element => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(isLoggingSelector);

  const handleLogin = () => {
    dispatch(authActions.action_Login({ username: 'hungnv', password: 'hungnv' }));
    // dispatch(
    //   authActions.action_Login_Other({
    //     data: { username: 'hungnv', password: 'hungnv' },
    //     callbacks: { onSuccess: (res: any) => {}, onError: () => {} },
    //   })
    // );
  };

  return isLogin() ? (
    <Redirect to="/admin/dashboard" />
  ) : (
    <div className={styles.root}>
      <Paper elevation={1} className={styles.box}>
        <Typography variant={'h5'} component={'h1'}>
          Student Management
        </Typography>
        <Box marginTop={4}>
          <Button fullWidth variant={'contained'} color={'primary'} onClick={handleLogin}>
            {isLogging && (
              <CircularProgress size={20} color={'secondary'} style={{ marginRight: 10 }} />
            )}{' '}
            Login App
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginPage;
