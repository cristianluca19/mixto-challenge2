import { makeStyles } from '@material-ui/core/styles'; 

export const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5)
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      alignItems: 'center'
    },
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
      marginBottom: theme.spacing(3),
    },
  }));
  