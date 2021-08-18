import { Box, makeStyles, Paper, Typography } from '@material-ui/core';

interface Props {
  title: string;
  children: any;
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

function Widget({ title, children }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Typography variant={'button'}>{title}</Typography>
      <Box mt={2}>{children}</Box>
    </Paper>
  );
}

export default Widget;
