import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';

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

const LoginPage = (): JSX.Element => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Paper elevation={1} className={styles.box}>
        <Typography variant={'h5'} component={'h1'}>
          Student Management
        </Typography>
        <Box marginTop={4}>
          <Button fullWidth variant={'contained'} color={'primary'}>
            Login App
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginPage;
