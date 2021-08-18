import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { ReactElement } from 'react';

interface Props {
  icon: ReactElement;
  value: string | number;
  label: string | number;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

function StatisticsItem(props: Props): JSX.Element {
  const { icon, value, label } = props;

  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align={'right'}>{value}</Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
}

export default StatisticsItem;
