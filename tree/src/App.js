import React from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DataView from './components/DataView'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  view :{
    padding: "2vw",
    marginTop: "2vh",
    marginBottom: "2vh",
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
    top : theme.spacing(8),
    left : theme.spacing(3)
  },
  title: {
    flexGrow: 1,
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Accomazzo Tree
        </Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="xl" >
      <DataView paperClass={classes.view} />
   </Container>
    </div>
  );
}

export default App;
